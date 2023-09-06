"use client"
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form"
import { useGetCareerProfile, usePostCoverLetter } from "@/hooks";
import { CoverLetterRequest } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { usePageContext } from "./contexts/PageContext";
import CoverLetter from "@/components/CoverLetter";

const initialCoverLetterRequest: CoverLetterRequest = {
  email: "",
  job_posting: {
    company_name: "",
    job_details: "",
    job_role: "",
    skills: "",
  }
};

export default function Page() {
  const [coverLetterRequest, setCoverLetterRequest] = useState<CoverLetterRequest>(initialCoverLetterRequest);
  const { setError, setLoading } = usePageContext();

  const { 
    data: careerProfileData, 
    isSuccess: careerProfileSuccess,
    isLoading: careerProfileLoading,
    error: careerProfileError,
  } = useGetCareerProfile({ email: coverLetterRequest.email, isEnabled: false });
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
    setCoverLetterRequest((prev) => {
      if (name.startsWith("job_posting.")) {
        const jobPostingProperty = name.split(".")[1];
        return {
          ...prev,
          job_posting: {
            ...prev.job_posting,
            [jobPostingProperty]: value,
          },
        }
      }
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  
  const submitCoverLetterForm = (event: FormEvent) => {
    event.preventDefault();
    submitCoverLetter(coverLetterRequest);
  }

  if (coverLetterLoading) {
    return null
  }

  if (coverLetter) {
    return <CoverLetter 
      content={coverLetter} 
      filename={coverLetterRequest?.job_posting?.company_name} 
      handleReset={resetCoverLetter}
    />
  }

  return (
    <div>
      <Form handleOnSubmit={submitCoverLetterForm}>
        <FormInput 
          type="email" 
          labelName="Email" 
          name="email" 
          placeholder="your@email.com" 
          value={coverLetterRequest.email}
          handleOnChange={(e) => setFormValue(e)}
          required={true}
        />
        { careerProfileData &&
          <div  className="mb-6">
            <h3 className="text-xl mb-4">Hi, {careerProfileData?.first_name}</h3>
            <p>Please enter the details of the job you are applying to generate a cover letter</p>
          </div>
        }
        <div className={!careerProfileSuccess ? "hidden" : ""}>
          <h4 className="text-gray-600 border-b-gray-300 border-b-2 py-4 mb-4">Job Posting</h4>
          <FormInput 
            type="text" 
            labelName="Company Name" 
            name="job_posting.company_name" 
            placeholder="Acme Inc" 
            value={coverLetterRequest.job_posting.company_name} 
            handleOnChange={(e) => setFormValue(e)}
            required={true}
          />
          <FormInput 
            type="text" 
            labelName="Job Role" 
            name="job_posting.job_role" 
            placeholder="CEO" 
            value={coverLetterRequest.job_posting.job_role} 
            handleOnChange={(e) => setFormValue(e)}
            required={true}
          />
          <FormTextarea 
            labelName="Job Details" 
            name="job_posting.job_details" 
            placeholder="Looking for a ..." 
            value={coverLetterRequest.job_posting.job_details} 
            handleOnChange={(e) => setFormValue(e)}
          />
          <FormInput 
            type="text" 
            labelName="Skills" 
            name="job_posting.skills" 
            placeholder="sales, accounting, etc." 
            value={coverLetterRequest.job_posting.skills} 
            handleOnChange={(e) => setFormValue(e)}
          />
          <FormButton type="submit" text="Generate Cover Letter" id="submit_cover_letter" disabled={!careerProfileSuccess}/>
        </div>
      </Form>
    </div>
  )
}
