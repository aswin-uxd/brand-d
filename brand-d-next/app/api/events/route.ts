import { NextResponse } from 'next/server';
import { eventSchema } from '@/schemas/event.schema';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Strict Zod Validation
    const validatedData = eventSchema.parse(body);

    // Get visitor ID from cookies or create a mock one for now
    const mockSessionId = 'sess_' + Math.random().toString(36).substring(2, 15);

    // Fast, non-blocking DB insert for the event
    // Note: In production, we would push this to Upstash/Redis to prevent Postgres connection limits,
    // and a CRON/Worker would flush them to Prisma.
    // For now, we write directly.
    
    let session = await prisma.session.findUnique({
      where: { visitorId: mockSessionId }
    });

    if (!session) {
      session = await prisma.session.create({
        data: {
          visitorId: mockSessionId,
          variants: "{}"
        }
      });
    }

    await prisma.event.create({
      data: {
        sessionId: session.id,
        eventType: validatedData.eventType,
        elementId: validatedData.elementId || null,
        metadata: validatedData.metadata ? JSON.stringify(validatedData.metadata) : "{}",
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return 400 immediately for bad payloads without logging heavy errors
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('Event Tracking Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
