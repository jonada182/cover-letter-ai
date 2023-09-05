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