import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.email().trim().toLowerCase(),
  name: z.string().trim().max(80).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
});

export type WaitlistPayload = z.infer<typeof waitlistSchema>;
