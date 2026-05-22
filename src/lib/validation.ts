import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.email().trim().toLowerCase(),
  name: z.string().trim().min(2).max(80).optional().or(z.literal("")),
  city: z.string().trim().min(2).max(80).optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export type WaitlistPayload = z.infer<typeof waitlistSchema>;
