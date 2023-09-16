"use client"
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form"
import { useGetCareerProfile, usePostCoverLetter } from "@/hooks";
import { JobPosting } from "@/types";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { usePageContext } from "../contexts/PageContext";
import CoverLetter from "@/components/CoverLetter";
import { useUserContext } from "../contexts/UserContext";
import Link from "next/link";

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
    data: coverLetter,
    error: coverLetterError,
    isLoading: coverLetterLoading,
    mutate: submitCoverLetter,
    reset: resetCoverLetter,
  } = usePostCoverLetter();

  const isPageError = coverLetterError
  const isPageLoading = coverLetterLoading

  useEffect(() => {
    setLoading(isPageLoading)
    setError(isPageError)
  }, [isPageError, isPageLoading]);

  const setFormValue = useCallback((event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const name = event.target.name
    setJobPostingForm((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }, [])

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
      <div className="p-4 mb-6 bg-blue-200 text-blue-900 text-sm rounded">Don`t forget to <Link className="font-bold hover:underline text-pink-700" href={"/career-profile"}>update your career profile</Link> for personalized cover letters</div>
      <Form handleOnSubmit={submitCoverLetterForm}>
        <div className={!profileId ? "hidden" : ""}>
          <div className="flex flex-grow w-full flex-col md:flex-row justify-items-stretch align-middle gap-6">
            <div className="flex-grow">
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
              <FormInput
                type="text"
                labelName="Skills"
                name="skills"
                placeholder="Eg. sales, accounting, etc."
                value={jobPostingForm.skills}
                handleOnChange={setFormValue}
              />
            </div>
            <div className="flex-grow">
              <FormTextarea
                labelName="Job Details"
                name="job_details"
                placeholder="Paste the job listing details here."
                value={jobPostingForm.job_details}
                handleOnChange={setFormValue}
                large={true}
              />
            </div>
          </div>
          <FormButton type="submit" text="Generate Cover Letter" id="submit_cover_letter" disabled={!!!profileId} />
        </div>
      </Form>
    </div>
  )
}
