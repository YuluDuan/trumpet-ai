import { number, z } from "zod";
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

export const formDataSchema = z.object({
  brandName: z.string(),
  theme: z.string().optional(),
  links: z.string().optional(),
  targetAudience: z.string().optional(),
  includeEmojis: z.boolean(),
  includeHashtags: z.boolean(),
  platforms: z.array(z.string()).min(1, "Please select at least one platform.").transform(platforms => {
    return platforms.map(Number)
  }),
  description: z.string().nonempty("description is required.")
    .min(10, "Please enter at least 10 characters.")
    .max(80, "The maximum character limit is 80.")
});

// {id: number, content: string, blurbRequestId: number, platformId: number}
export const blurbSchema = z.object({
    id: z.number(),
    content: z.string(),
    blurbRequestId: z.number(),
    platformId: z.number(),
  }
)
export const blurbsSchema = z.array(blurbSchema);
export type Blurb = z.infer<typeof blurbSchema>;

