"use client"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import moment from "moment"
import { UUID } from "crypto"
import { PiLinkThin, PiTrashThin, PiPencilThin, PiCalendarPlusThin } from "react-icons/pi"
import useJobApplications from "@/app/tracker/hooks/useJobApplications"
import { JobApplication, JobApplicationEvent, JobApplicationEventType, jobApplicationEventTypes } from "@/types"
import { usePageContext } from "@/contexts/PageContext"
import { useUserContext } from "@/contexts/UserContext"
import { PageError, PageLoading } from "@/components/Page"
import { FormButton, FormInput, FormTextarea } from "@/components/Form"
import FormSelect from "@/components/Form/FormSelect"
import Modal from "@/components/Modal"

const initialJobApplication: JobApplication = {
  company_name: "",
  job_role: "",
  url: ""
}

const initialJobApplicationEvent: JobApplicationEvent = {
  type: JobApplicationEventType.Submission,
  description: "",
  date: moment.now().toString(),
  additional_notes: "",
}

export default function Page() {
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false)
  const [eventModalIsOpen, setEventModalIsOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<UUID | null>(null)
  const [eventJobApplicationId, setEventJobApplicationId] = useState<UUID | null>(null)
  const [jobApplicationForm, setJobApplicationForm] = useState<JobApplication>(initialJobApplication)
  const [jobApplicationEventForm, setJobApplicationEventForm] = useState<JobApplicationEvent>(initialJobApplicationEvent)
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
    addJobApplicationEvent,
    deleteJobApplicationEvent,
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
      setEventModalIsOpen(false)
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

  const setEventFormValue = useCallback((event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const name = event.target.name
    setJobApplicationEventForm((prev) => {
      return {
        ...prev,
        [name]: name == "type" ? parseInt(value) : value,
      }
    })
  }, [])

  const handleSubmitForm = (event: FormEvent) => {
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
        access_token: linkedInAccessToken,
        profile_id: profileId,
      })
    }
  }

  const handleConfirmDelete = (jobApplicationId: UUID | null | undefined) => {
    if (jobApplicationId) {
      setDeleteId(jobApplicationId)
      setDeleteModalIsOpen(true)
    }
  }

  const handleAddEvent = (jobApplicationId: UUID | null | undefined) => {
    if (jobApplicationId) {
      setEventJobApplicationId(jobApplicationId)
      setEventModalIsOpen(true)
    }
  }

  const handleEventSubmitForm = (event: FormEvent) => {
    event.preventDefault()
    addJobApplicationEvent({
      jobApplicationId: eventJobApplicationId,
      event: jobApplicationEventForm,
    })
    setJobApplicationEventForm(initialJobApplicationEvent)
    setEventJobApplicationId(null)
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
            <div className="w-1/3 md:w-1/4 flex justify-center items-center p-4 gap-2">
              <button className="btn-icon" onClick={() => handleAddEvent(jobApplication.id)}><PiCalendarPlusThin /></button>
              {jobApplication.url && <Link className="btn-icon" target="_blank" href={jobApplication.url}><PiLinkThin /></Link>}
              <button className="btn-icon"><PiPencilThin /></button>
              <button className="btn-icon" onClick={() => handleConfirmDelete(jobApplication.id)}><PiTrashThin /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal title="Add Job Application" onClose={() => setAddModalIsOpen(false)} onConfirm={handleSubmitForm} isOpen={addModalIsOpen}>
        <div>
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
        </div>
      </Modal>

      <Modal title="Delete Job Application" isOpen={deleteModalIsOpen} onConfirm={handleDelete} onClose={() => setDeleteModalIsOpen(false)}>
        {deleteJobApplicationError && <PageError error={deleteJobApplicationError} />}
        {deleteJobApplicationIsLoading && <PageLoading loading={deleteJobApplicationIsLoading} />}
        <p>Would you like to delete this job application?</p>
      </Modal>

      <Modal title="Add Job Application Event" isOpen={eventModalIsOpen} onConfirm={handleEventSubmitForm} onClose={() => setEventModalIsOpen(false)}>
        <div>
          {postJobApplicationError && <PageError error={postJobApplicationError} />}
          {postJobApplicationIsLoading && <PageLoading loading={postJobApplicationIsLoading} />}
          <FormSelect
            name="type"
            value={jobApplicationEventForm.type}
            handleOnChange={setEventFormValue}
            labelName="Event Type"
            required={true}
            options={jobApplicationEventTypes.map((type) => [type, JobApplicationEventType[type as any]])}
          />
          <FormInput
            type="text"
            name="description"
            labelName="Description"
            placeholder="Eg. Lorem ipsum"
            required={true}
            handleOnChange={setEventFormValue}
            value={jobApplicationEventForm.description}
          />
          <FormTextarea
            name="additional_notes"
            labelName="Additional Notes"
            placeholder="Eg. Lorem ipsum"
            handleOnChange={setEventFormValue}
            value={jobApplicationEventForm.additional_notes}
          />
        </div>
      </Modal>
    </div>
  )
}
