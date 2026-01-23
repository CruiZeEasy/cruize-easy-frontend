// export interface CampaignRegistrationPayload {
//   videoContentUrl: string;
//   videoTitle: string;
//   twitterHandle?: string;
//   facebookHandle?: string;
//   instagramHandle?: string;
//   tiktokHandle?: string;
//   motivation: string;
//   expectedReach?: number;
//   customMessage?: string;
//   registrationSource?: string;
//   utmSource?: string;
//   utmMedium?: string;
//   utmCampaign?: string;
//   agreedToTerms: boolean;
//   contentRightsGranted: boolean;
//   marketingConsent: boolean;
// }

// export interface CampaignRegistrationResponse {
//   success: boolean;
//   message: string;
//   id: string;
//   userId: string;
//   email: string;
//   fullName: string;
//   campaignId: string;
//   videoContentUrl: string;
//   twitterHandle?: string;
//   facebookHandle?: string;
//   instagramHandle?: string;
//   tiktokHandle?: string;
//   campaignLink: string;
//   status: CampaignStatus;
//   isWinner: boolean;
//   prizeCategory?: string;
//   referralClicks: number;
//   successfulReferrals: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export type CampaignStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";

// export interface Campaign {
//   id: string;
//   name: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   startDate: string;
//   endDate: string;
//   isActive: boolean;
//   prizes: string[];
// }

export interface CampaignRegistrationPayload {
  videoContentUrl: string;
  videoTitle: string;
  twitterHandle?: string;
  facebookHandle?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
  motivation: string;
  registrationSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  agreedToTerms: boolean;
  contentRightsGranted: boolean;
  marketingConsent: boolean;
}

// Response when registering for the first time
export interface CampaignRegistrationResponse {
  success: boolean;
  message: string;
  campaignLink: string;
}

// Response when checking campaign status
export interface CampaignStatusResponse {
  registered: boolean;
  message: string;
  registration?: CampaignRegistration;
}

export interface CampaignRegistration {
  success: boolean;
  message: string;
  id: string;
  userId: string;
  email: string;
  fullName: string;
  campaignId: string;
  videoContentUrl: string;
  videoTitle?: string;
  twitterHandle?: string;
  facebookHandle?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
  motivation?: string;
  campaignLink: string;
  status: CampaignStatus;
  isWinner: boolean;
  prizeCategory?: string;
  referralClicks: number;
  successfulReferrals: number;
  createdAt: string;
  updatedAt: string;
}

export type CampaignStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
