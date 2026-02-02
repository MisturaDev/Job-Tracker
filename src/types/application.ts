export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected";
export type LocationType = "remote" | "onsite" | "hybrid";

export interface Application {
  id: string;
  user_id: string;
  company_name: string;
  role: string;
  location_type: LocationType;
  application_link: string | null;
  date_applied: string;
  status: ApplicationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
