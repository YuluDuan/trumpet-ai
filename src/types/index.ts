import { z } from "zod";
export const blurbRequestSchema = z.object(
  {
    brandName: z.string(),
    theme: z.string(),
    description: z.string().optional(),
    links: z.string().optional(),
    targetAudience: z.string().optional(),
    includeEmojis: z.boolean(),
    includeHashtags: z.boolean(),
  }
);
export type BlurbRequest = z.infer<typeof blurbRequestSchema>;

export const platformSchema = z.object({
  id: z.number(),
  name: z.string(),
})
export type Platform = z.infer<typeof platformSchema>;

