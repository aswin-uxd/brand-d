import { z } from "zod";

export const leadSchema = z.object({
  url: z.string().url({ message: "Please enter a valid website URL." }).optional().or(z.literal('')),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid work email." }),
  goal: z.enum(["leads", "sales", "traffic"], {
    message: "Please select a primary goal.",
  }),
  budget: z.enum(["under_5k", "5k_10k", "10k_plus"], {
    message: "Please select a budget range.",
  }).optional(),
  honeypot: z.string().max(0).optional(), // Must be empty to pass
});

export type LeadInput = z.infer<typeof leadSchema>;
