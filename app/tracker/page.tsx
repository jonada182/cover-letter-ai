"use client"
import { useGetJobApplications, usePostJobApplication } from "@/hooks"
import { usePageContext } from "../contexts/PageContext"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import Modal from "@/components/Modal"
import { JobApplication } from "@/types"
import { Form, FormButton, FormInput } from "@/components/Form"
import { useUserContext } from "../contexts/UserContext"

export default function Page() {
  const initialJobApplication: JobApplication = {
    company_name: "",
    job_role: "",
    url: ""
  }
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false)
  const [jobApplicationForm, setJobApplicationForm] = useState<JobApplication>(initialJobApplication)
  const {
    data: jobApplications,
    error: jobApplicationsError,
    isLoading: jobApplicationsLoading
  } = useGetJobApplications()

  const {
    data: postJobApplicationData,
    error: postJobApplicationError,
    isLoading: postJobApplicationLoading,
    mutate: postJobApplication,
    reset: resetPostJobApplication,
  } = usePostJobApplication()

  const { profileId, linkedInAccessToken } = useUserContext()
  const { setError, setLoading } = usePageContext()

  useEffect(() => {
    setError(jobApplicationsError)
    setLoading(jobApplicationsLoading)
  }, [jobApplicationsError, jobApplicationsLoading])

  const setFormValue = useCallback((event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const name = event.target.name
    setJobApplicationForm((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }, [])

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault()
    postJobApplication({
      request: {
        profile_id: profileId,
        job_application: jobApplicationForm,
      }, access_token: linkedInAccessToken
    })
  }

  return (
    <div>
      <div>
        <FormButton text="Add Job Application" onClick={() => setAddModalIsOpen(true)} />
      </div>
      <Modal title="Add Job Application" onClose={() => { }} onConfirm={() => { }} isOpen={addModalIsOpen}>
        <Form handleOnSubmit={handleSubmitForm}>
          <FormInput
            type="text"
            name="company_name"
            labelName="Company Name"
            required={true}
            handleOnChange={setFormValue}
            value={jobApplicationForm.company_name}
          />
          <FormInput
            type="text"
            name="job_role"
            labelName="Job Role"
            required={true}
            handleOnChange={setFormValue}
            value={jobApplicationForm.job_role}
          />
          <FormInput
            type="url"
            name="url"
            labelName="Job Posting URL"
            required={true}
            handleOnChange={setFormValue}
            value={jobApplicationForm.url}
          />
        </Form>
      </Modal>
    </div>
  )
}
