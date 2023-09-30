"use client"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import moment from "moment"
import { UUID } from "crypto"
import { PiLinkThin, PiTrashThin, PiPencilThin } from "react-icons/pi"
import { useJobApplications } from "@/hooks"
import { usePageContext } from "../contexts/PageContext"
import Modal from "@/components/Modal"
import { JobApplication } from "@/types"
import { Form, FormButton, FormInput } from "@/components/Form"
import { useUserContext } from "../contexts/UserContext"
import { PageError, PageLoading } from "@/components/Page"

const initialJobApplication: JobApplication = {
  company_name: "",
  job_role: "",
  url: ""
}

export default function Page() {
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<UUID | null>(null)
  const [jobApplicationForm, setJobApplicationForm] = useState<JobApplication>(initialJobApplication)
  const {
    data: jobApplications,
    fetchError: jobApplicationsError,
    fetchIsLoading: jobApplicationsLoading,
    postError: postJobApplicationError,
    postIsLoading: postJobApplicationIsLoading,
    postIsSuccess: postJobApplicationSuccess,
    deleteError: deleteJobApplicationError,
    deleteIsLoading: deleteJobApplicationIsLoading,
    deleteIsSuccess: deleteJobApplicationSuccess,
    refetch: fetchJobApplications,
    mutate: postJobApplication,
    deleteApplication: deleteJobApplication,
    reset: resetPostJobApplication,
  } = useJobApplications()

  const { profileId, linkedInAccessToken } = useUserContext()
  const { setError, setLoading } = usePageContext()

  useEffect(() => {
    setError(jobApplicationsError)
    setLoading(jobApplicationsLoading)
  }, [jobApplicationsError, jobApplicationsLoading])

  useEffect(() => {
    if (postJobApplicationSuccess) {
      fetchJobApplications()
      resetPostJobApplication()
      setJobApplicationForm(initialJobApplication)
      setAddModalIsOpen(false)
    }
  }, [postJobApplicationSuccess])

  useEffect(() => {
    if (deleteJobApplicationSuccess) {
      fetchJobApplications()
      setDeleteModalIsOpen(false)
      setDeleteId(null)
    }
  }, [deleteJobApplicationSuccess])

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

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault()
    postJobApplication({
      jobApplication: {
        profile_id: profileId,
        ...jobApplicationForm,
      }, access_token: linkedInAccessToken
    })
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteJobApplication({
        jobApplicationId: deleteId,
        access_token: linkedInAccessToken
      })
    }
  }

  const handleConfirmDelete = (jobApplicationId: UUID | null | undefined) => {
    if (jobApplicationId) {
      setDeleteId(jobApplicationId)
      setDeleteModalIsOpen(true)
    }
  }

  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Job Applications</h2>
        <FormButton text="Add Job Application" onClick={() => setAddModalIsOpen(true)} />
      </div>
      <div>
        {!jobApplications && <div className="p-4 text-center text-gray-400">You haven`t added any job applications yet</div>}
        {jobApplications?.map((jobApplication) => (
          <div key={jobApplication.id} className="flex items-center justify-stretch bg-white border-t border-gray-200 first:border-0">
            <div className="flex-grow border-r border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div className="text-base font-bold text-blue-900 capitalize">{jobApplication.job_role}</div>
                <div
                  className="text-xs text-gray-400"
                  title={moment(jobApplication.updated_at).format("MMM D, YYYY hh:mm a")}
                >
                  {moment(jobApplication.updated_at).fromNow()}
                </div>
              </div>
              <div className="text-xs capitalize">{jobApplication.company_name}</div>
            </div>
            <div className="w-1/5 flex justify-center items-center p-4 gap-2">
              {jobApplication.url && <Link className="btn-icon" target="_blank" href={jobApplication.url}><PiLinkThin /></Link>}
              <button className="btn-icon"><PiPencilThin /></button>
              <button className="btn-icon" onClick={() => handleConfirmDelete(jobApplication.id)}><PiTrashThin /></button>
            </div>
          </div>
        ))}
      </div>
      <Modal title="Add Job Application" onClose={() => setAddModalIsOpen(false)} onConfirm={handleSubmitForm} isOpen={addModalIsOpen}>
        <Form handleOnSubmit={handleSubmitForm}>
          {postJobApplicationError && <PageError error={postJobApplicationError} />}
          {postJobApplicationIsLoading && <PageLoading loading={postJobApplicationIsLoading} />}
          <FormInput
            type="text"
            name="company_name"
            labelName="Company Name"
            placeholder="Eg. Acme Inc"
            required={true}
            handleOnChange={setFormValue}
            value={jobApplicationForm.company_name}
          />
          <FormInput
            type="text"
            name="job_role"
            labelName="Job Role"
            placeholder="Eg. Manager"
            required={true}
            handleOnChange={setFormValue}
            value={jobApplicationForm.job_role}
          />
          <FormInput
            type="url"
            name="url"
            labelName="Job Posting URL"
            placeholder="Eg. https://linkedin.com"
            handleOnChange={setFormValue}
            value={jobApplicationForm.url}
          />
        </Form>
      </Modal>
      <Modal title="Delete Job Application" isOpen={deleteModalIsOpen} onConfirm={handleDelete} onClose={() => setDeleteModalIsOpen(false)}>
        {deleteJobApplicationError && <PageError error={deleteJobApplicationError} />}
        {deleteJobApplicationIsLoading && <PageLoading loading={deleteJobApplicationIsLoading} />}
        <p>Would you like to delete this job application?</p>
      </Modal>
    </div>
  )
}
