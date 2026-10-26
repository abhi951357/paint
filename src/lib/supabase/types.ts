export interface QuoteEstimate {
  roomType: string;
  scope: string;
  area: number;
  grade: string;
  estimatedMin: number;
  estimatedMax: number;
}

export type QuoteStatus = 
  | "new" 
  | "contacted" 
  | "survey_scheduled" 
  | "in_progress" 
  | "completed" 
  | "cancelled";

export interface QuoteRequest {
  id?: string;
  reference_id: string;
  service: string;
  property_type?: string | null;
  timeline?: string | null;
  name: string;
  email?: string | null;
  phone: string;
  postcode?: string | null;
  notes?: string | null;
  estimate_min?: number | null;
  estimate_max?: number | null;
  estimate_details?: QuoteEstimate | null;
  status: QuoteStatus;
  admin_notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message: string;
  created_at?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  created_at?: string;
}
