import { z } from "zod";

export const eventSchema = z.object({
  eventType: z.enum([
    "page_view",
    "scroll_25",
    "scroll_50",
    "scroll_75",
    "scroll_100",
    "cta_click",
    "form_start",
    "form_abandon",
  ]),
  elementId: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  path: z.string(),
});

export type EventInput = z.infer<typeof eventSchema>;
