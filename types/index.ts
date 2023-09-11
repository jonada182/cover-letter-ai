import { HttpStatusCode } from "axios"

export type NavigationLink = {
  path: string
  name: string
  description: string | ""
}

export interface APIError {
  code?: string
  status?: HttpStatusCode
  message?: string
  name?: string
  error: Error
}

export type ContactInfo = {
  email: string
  address: string
  phone: string
  website: string
}

export type CareerProfile = {
  id?: string
  first_name: string
  last_name: string
  headline: string
  experience_years: number
  summary: string
  skills: string[]
  contact_info: ContactInfo
}

export type JobPosting = {
  company_name: string
  job_role: string
  job_details: string
  skills: string
}

export type CoverLetterRequest = {
  email: string
  job_posting: JobPosting
}

export type JobApplicationRequest = {
  email: string
  job_application: JobApplication
}

export type JobApplication = {
  id?: string
  company_name: string
  job_role: string
  url?: string
  events?: JobApplicationEvent[]
  createdAt?: string
  updatedAt?: string
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
