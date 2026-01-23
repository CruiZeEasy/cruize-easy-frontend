import { z } from "zod";

export const campaignRegistrationSchema = z
  .object({
    videoContentUrl: z
      .string()
      .min(1, "Video URL is required")
      .url("Please enter a valid URL"),
    videoTitle: z
      .string()
      .min(5, "Video title must be at least 5 characters")
      .max(100, "Video title must not exceed 100 characters"),
    twitterHandle: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[A-Za-z0-9_]{1,15}$/.test(val),
        "Invalid Twitter handle format",
      ),
    facebookHandle: z.string().optional(),
    instagramHandle: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[A-Za-z0-9_.]{1,30}$/.test(val),
        "Invalid Instagram handle format",
      ),
    tiktokHandle: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[A-Za-z0-9_.]{1,24}$/.test(val),
        "Invalid TikTok handle format",
      ),
    motivation: z
      .string()
      .min(
        20,
        "Please tell us more about why you want to join (at least 20 characters)",
      )
      .max(500, "Motivation must not exceed 500 characters"),
    agreedToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the terms and conditions",
      ),
    contentRightsGranted: z
      .boolean()
      .refine((val) => val === true, "You must grant content rights"),
    marketingConsent: z.boolean(),
  })
  .refine(
    (data) => {
      return (
        !!data.twitterHandle ||
        !!data.facebookHandle ||
        !!data.instagramHandle ||
        !!data.tiktokHandle
      );
    },
    {
      message: "Please provide at least one social media handle",
      path: ["twitterHandle"],
    },
  );

export type CampaignFormData = z.infer<typeof campaignRegistrationSchema>;
