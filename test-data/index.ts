import { randomUUID } from "crypto";

export const testAccessToken = "some token";
export const testEmail = "test@test.com";
export const testProfileID = randomUUID();
export const testJobApplicationID = randomUUID();
export const testUser = {
  profile_id: testProfileID
}
export const testCareerProfile = {
  id: testProfileID,
  first_name: "John",
  last_name: "Doe",
  headline: "CEO",
  experience_years: 10,
  summary: "test",
  skills: ["test"],
  contact_info: {
    email: testEmail,
    address: "123 street",
    phone: "123",
    website: "123.com",
  },
};
export const testCoverLetter = "nice cover letter";
export const testCoverLetterRequest = {
  profile_id: testProfileID,
  job_posting: {
    company_name: "Acme",
    job_role: "CEO",
    job_details: "great job",
    skills: "sales"
  }
};
export const testJobApplicationRequest = {
  profile_id: testProfileID,
  company_name: "Acme",
  job_role: "CEO"
};
export const testJobApplication = {
  id: "1",
  company_name: "Acme",
  job_role: "CEO"
};
export const testJobApplications = [
  {
    id: "1",
    company_name: "Acme",
    job_role: "CEO"
  }
];
export const testJobApplicationEvent = {
  job_application_id: "1",
  description: "lorem ipsum",
  date: "1999-01-01",
  type: 0
}
