'use client'
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form"
import { CoverLetterRequest } from "@/types";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Page() {
  const initialCoverLetterRequest: CoverLetterRequest = {
    email: '',
    job_posting: {
      company_name: '',
      job_details: '',
      job_role: '',
      skills: [],
    }
  };
  const [coverLetterRequest, setCoverLetterRequest] = useState<CoverLetterRequest>(initialCoverLetterRequest)
  const setFormValue = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const name = event.target.name
    setCoverLetterRequest((prev) => {
      if (name.startsWith('job_posting.')) {
        const jobPostingProperty = name.split('.')[1];
        return {
          ...prev,
          job_posting: {
            ...prev.job_posting,
            [jobPostingProperty]: jobPostingProperty === 'skills' ? value.split(',') : value,
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
    console.log("Cover Letter Request", coverLetterRequest);
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
        />
        <h4 className="text-gray-600 border-b-gray-300 border-b-2 py-4 mb-4">Job Posting</h4>
        <FormInput 
          type="text" 
          labelName="Company Name" 
          name="job_posting.company_name" 
          placeholder="Acme Inc" 
          value={coverLetterRequest.job_posting.company_name} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormInput 
          type="text" 
          labelName="Job Role" 
          name="job_posting.job_role" 
          placeholder="CEO" 
          value={coverLetterRequest.job_posting.job_role} 
          handleOnChange={(e) => setFormValue(e)}
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
        <FormButton text="Generate Cover Letter" id="submit_cover_letter"/>
      </Form>
    </div>
  )
}
