import { number, z } from "zod";
export const blurbRequestSchema = z.object({
  brandName: z.string(),
  theme: z.string(),
  description: z.string(),
  links: z.string(),
  targetAudience: z.string(),
  includeEmojis: z.boolean(),
  includeHashtags: z.boolean(),
  platforms: z.array(z.string()),
});
export const blurbRequestNoPlatformsDTOSchema = blurbRequestSchema.omit({ platforms: true });
export type BlurbRequest = z.infer<typeof blurbRequestSchema>;
export type BlurbRequestNoPlatform = z.infer<typeof blurbRequestNoPlatformsDTOSchema>

export const blurbRequestFullSchema = blurbRequestSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type BlurbRequestFull = z.infer<typeof blurbRequestFullSchema>;

export const platformSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Platform = z.infer<typeof platformSchema>;

export const formDataSchema = z.object({
  brandName: z.string().nonempty("Product/Brand Name is required"),
  theme: z.string().optional(),
  links: z.string().optional(),
  targetAudience: z.string().optional(),
  includeEmojis: z.boolean(),
  includeHashtags: z.boolean(),
  platforms: z.array(z.string()).min(1, "Please select at least one platform."),
  description: z
    .string()
    .nonempty("Description is required.")
    .min(10, "Please enter at least 10 characters."),
});

export const blurbSchema = z.object({
  id: z.string(),
  content: z.string(),
  platformName: z.string(),
});
export const blurbsSchema = z.array(blurbSchema);
export type Blurb = z.infer<typeof blurbSchema>;

export enum PLATFORM {
    LinkedIn = "LinkedIn",
    Instagram = "Instagram",
    Twitter = "Twitter",
    TikTok = "TikTok"
}

export enum DROPDOWNTYPE{
  userCenter = "userType",
  mainPage = "mainType"
}

export const blurbVariantNewDTOSchema = z.object({
  platformName: z.nativeEnum(PLATFORM),
  blurbRequestId: z.string(),
  content: z.string(),
})
export type BlurbVariantNew = z.infer<typeof blurbVariantNewDTOSchema>;

export const blurbVariantFullDTOSchema = blurbVariantNewDTOSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  platformName: z.nativeEnum(PLATFORM),
  blurbRequestId: z.string(),
})
export type BlurbVariantFull = z.infer<typeof blurbVariantFullDTOSchema>;

export const blurbVariantUISchema = blurbVariantFullDTOSchema.extend({
  isVariant: z.boolean(),
  isLoading: z.boolean(),
  isVisible: z.boolean(),
})
export type BlurbVariantUI = z.infer<typeof blurbVariantUISchema>;