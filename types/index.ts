import { HttpStatusCode } from "axios"
import { UUID } from "crypto"

export type NavigationLink = {
  path: string
  name: string
  description?: string | ""
  isHidden?: boolean
}

export interface APIError {
  code?: string
  status?: HttpStatusCode
  message?: string
  name?: string
  error: Error
}

export type User = {
  profile_id: UUID
}

export type ContactInfo = {
  email: string
  address: string
  phone: string
  website: string
}

export type CareerProfile = {
  id?: UUID
  first_name: string
  last_name: string
  headline: string
  experience_years: number
  summary: string
  skills: string[]
  contact_info: ContactInfo
}

export type CareerProfileRequest = {
  careerProfile: CareerProfile
  access_token: string | null
}

export type JobPosting = {
  company_name: string
  job_role: string
  job_details: string
  skills: string
}

export type CoverLetterRequest = {
  profile_id: UUID | null
  job_posting: JobPosting
}

export type JobApplication = {
  id?: UUID | null
  profile_id?: UUID | null
  company_name: string
  job_role: string
  url?: string
  events?: JobApplicationEvent[]
  created_at?: string
  updated_at?: string
}

export type JobApplicationEvent = {
  job_application_id?: string
  type: JobApplicationEventType
  description: string
  date: string
  additional_notes?: string
}

enum JobApplicationEventType {
  "Submission" = 0,
  "Interview" = 1,
  "Assessment" = 2,
  "Offer" = 3,
  "Completion" = 4,
  "Rejection" = 5,
}
