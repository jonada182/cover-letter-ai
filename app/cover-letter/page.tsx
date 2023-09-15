"use client"
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form"
import { useGetCareerProfile, usePostCoverLetter } from "@/hooks";
import { JobPosting } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { usePageContext } from "../contexts/PageContext";
import CoverLetter from "@/components/CoverLetter";
import { useUserContext } from "../contexts/UserContext";

const initialJobPosting: JobPosting = {
  company_name: "",
  job_details: "",
  job_role: "",
  skills: "",
};

export default function Page() {
  const [jobPostingForm, setJobPostingForm] = useState<JobPosting>(initialJobPosting);
  const { setError, setLoading } = usePageContext();
  const { profileId } = useUserContext();

  const {
    data: careerProfileData,
    isSuccess: careerProfileSuccess,
    isLoading: careerProfileLoading,
    error: careerProfileError,
  } = useGetCareerProfile({ profile_id: profileId, isEnabled: false });
  const {
    data: coverLetter,
    error: coverLetterError,
    isLoading: coverLetterLoading,
    mutate: submitCoverLetter,
    reset: resetCoverLetter,
  } = usePostCoverLetter();

  const isPageError = coverLetterError || careerProfileError
  const isPageLoading = coverLetterLoading || careerProfileLoading

  useEffect(() => {
    setLoading(isPageLoading)
    setError(isPageError)
  }, [isPageError, isPageLoading]);

  const setFormValue = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const name = event.target.name
    setJobPostingForm((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const submitCoverLetterForm = (event: FormEvent) => {
    event.preventDefault();
    submitCoverLetter({
      profile_id: profileId,
      job_posting: jobPostingForm,
    });
  }

  if (coverLetterLoading) {
    return null
  }

  if (coverLetter) {
    return <CoverLetter
      content={coverLetter}
      filename={jobPostingForm?.company_name}
      handleReset={resetCoverLetter}
    />
  }

  return (
    <div>
      <Form handleOnSubmit={submitCoverLetterForm}>
        {careerProfileData &&
          <div className="mb-6">
            <h3 className="text-xl mb-4">Hi, {careerProfileData?.first_name}</h3>
            <p>Please fill in the information about the job you are applying for:</p>
          </div>
        }
        <div className={!careerProfileSuccess ? "hidden" : ""}>
          <FormInput
            type="text"
            labelName="Company Name"
            name="company_name"
            placeholder="Eg. Acme Corporation"
            value={jobPostingForm.company_name}
            handleOnChange={setFormValue}
            required={true}
          />
          <FormInput
            type="text"
            labelName="Job Role"
            name="job_role"
            placeholder="Eg. Manager"
            value={jobPostingForm.job_role}
            handleOnChange={setFormValue}
            required={true}
          />
          <FormTextarea
            labelName="Job Details"
            name="job_details"
            placeholder="Paste the job listing details here."
            value={jobPostingForm.job_details}
            handleOnChange={setFormValue}
          />
          <FormInput
            type="text"
            labelName="Skills"
            name="skills"
            placeholder="Eg. sales, accounting, etc."
            value={jobPostingForm.skills}
            handleOnChange={setFormValue}
          />
          <FormButton type="submit" text="Generate Cover Letter" id="submit_cover_letter" disabled={!careerProfileSuccess} />
        </div>
      </Form>
    </div>
  )
}
