import { NextResponse } from 'next/server';
import { z } from 'zod';
import { leadSchema } from '@/schemas/lead.schema';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Zod Validation
    const validatedData = leadSchema.parse(body);

    // 2. Honeypot Spam Protection
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      // Silently accept but do nothing
      return NextResponse.json({ success: true, message: "Lead received." });
    }

    // 3. Create unique sessionId (mocking for now since session tracking isn't fully built)
    // Normally we'd grab this from cookies.
    const mockSessionId = 'sess_' + Math.random().toString(36).substring(2, 15);
    
    // Ensure session exists
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

    // 4. Save Lead
    const lead = await prisma.lead.create({
      data: {
        sessionId: session.id,
        email: validatedData.email,
        goal: validatedData.goal,
        // Since budget/name might be mapped or handled differently later, we'll store essentials
        // If we want to store all, we might need to update Prisma schema, but for now we have basic fields
        status: "NEW",
        behaviorScore: 10, // Base score
      }
    });

    // 5. Fire n8n Webhook (Mocked with try/catch to prevent failure)
    try {
      const webhookUrl = process.env.N8N_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
      }
    } catch (e) {
      console.error('Failed to notify n8n, but lead is saved.', e);
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('Lead capture error:', error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
