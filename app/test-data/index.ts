export const testEmail = "test@test.com";
export const testCareerProfile = {
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
  email: testEmail,
  job_posting: {
    company_name: "Acme",
    job_role: "CEO",
    job_details: "great job",
    skills: "sales"
  }
};
export const testJobApplicationRequest = {
  email: testEmail,
  job_application: {
    company_name: "Acme",
    job_role: "CEO"
  }
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
