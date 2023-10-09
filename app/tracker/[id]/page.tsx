"use client"
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { UUID } from "crypto"
import { JobApplication, JobApplicationEvent, JobApplicationEventType, jobApplicationEventTypes } from "@/types"
import { getCurrentDate } from "@/utils"
import { useUserContext } from "@/contexts/UserContext"
import useJobApplication from "@/app/tracker/hooks/useJobApplication"
import Modal from "@/components/Modal"
import FormSelect from "@/components/Form/FormSelect"
import { FormInput, FormTextarea } from "@/components/Form"
import JobApplicationForm from "@/app/tracker/components/JobApplicationForm"
import JobApplicationView from "@/app/tracker/components/JobApplicationView"

const initialJobApplication: JobApplication = {
  company_name: "",
  job_role: "",
  url: "",
};

const initialJobApplicationEvent: JobApplicationEvent = {
  type: JobApplicationEventType.Submission,
  description: "",
  date: getCurrentDate(),
  additional_notes: "",
};

export default function Page() {
  const params = useParams()

  const [jobApplicationId, setJobApplicationId] = useState<UUID | null>(null)

  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [eventModalIsOpen, setEventModalIsOpen] = useState<boolean>(false);

  const [jobApplicationForm, setJobApplicationForm] = useState<JobApplication>(initialJobApplication);
  const [jobApplicationEventForm, setJobApplicationEventForm] = useState<JobApplicationEvent>(initialJobApplicationEvent);

  const { profileId, linkedInAccessToken } = useUserContext();

  const {
    jobApplication,
    postError: postJobApplicationError,
    postIsLoading: postJobApplicationIsLoading,
    postIsSuccess: postJobApplicationSuccess,
    deleteError: deleteJobApplicationError,
    deleteIsLoading: deleteJobApplicationIsLoading,
    deleteIsSuccess: deleteJobApplicationSuccess,
    refetch,
    mutate: postJobApplication,
    deleteApplication: deleteJobApplication,
    reset: resetPostJobApplication,
    addJobApplicationEvent,
    deleteJobApplicationEvent,
  } = useJobApplication({ jobApplicationId: jobApplicationId });

  useEffect(() => {
    if (params && params.id && params.id != "") {
      setJobApplicationId(params.id as UUID)
    }
  }, [params])

  useEffect(() => {
    if (postJobApplicationSuccess) {
      refetch();
      resetPostJobApplication();
      setJobApplicationForm(initialJobApplication);
      setAddModalIsOpen(false);
      setEventModalIsOpen(false);
    }
  }, [postJobApplicationSuccess]);

  useEffect(() => {
    if (deleteJobApplicationSuccess) {
      refetch();
      setDeleteModalIsOpen(false);
    }
  }, [deleteJobApplicationSuccess]);


  const setEventFormValue = useCallback(
    (
      event:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLTextAreaElement>
        | ChangeEvent<HTMLSelectElement>
    ) => {
      const value = event.target.value;
      const name = event.target.name;
      setJobApplicationEventForm((prev) => {
        return {
          ...prev,
          [name]: name == "type" ? parseInt(value) : value,
        };
      });
    },
    []
  );

  const handleEditApplication = useCallback((application: JobApplication) => {
    setAddModalIsOpen(true);
    setJobApplicationForm(application);
  }, []);

  const handleAddEvent = useCallback((jobApplicationId: UUID | null | undefined) => {
    if (jobApplicationId) {
      setEventModalIsOpen(true);
    }
  }, []);

  const handleEventSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    addJobApplicationEvent({
      ...jobApplicationEventForm,
      date: getCurrentDate(),
    });
    setJobApplicationEventForm(initialJobApplicationEvent);
  };

  const setFormValue = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      const value = event.target.value;
      const name = event.target.name;
      setJobApplicationForm((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    []
  );

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    postJobApplication({
      jobApplication: {
        profile_id: profileId,
        ...jobApplicationForm,
      },
      accessToken: linkedInAccessToken,
    });
  };

  const handleDelete = () => {
    deleteJobApplication({
      jobApplicationId: jobApplicationId,
      accessToken: linkedInAccessToken,
      profileId: profileId,
    });
  };

  const handleConfirmDelete = useCallback((jobApplicationId: UUID | null | undefined) => {
    if (jobApplicationId) {
      setDeleteModalIsOpen(true);
    }
  }, []);

  return (
    <div>
      <JobApplicationView
        jobApplication={jobApplication}
        handleAddEvent={handleAddEvent}
        handleDeleteApplication={handleConfirmDelete}
        handleEditApplication={handleEditApplication}
        handleEventDelete={deleteJobApplicationEvent}
      />

      <Modal
        title="Track A New Event"
        isOpen={eventModalIsOpen}
        onConfirm={handleEventSubmitForm}
        onClose={() => setEventModalIsOpen(false)}
        isError={postJobApplicationError}
        isLoading={postJobApplicationIsLoading}
      >
        <div>
          <FormSelect
            name="type"
            value={jobApplicationEventForm.type}
            handleOnChange={setEventFormValue}
            labelName="Event Type"
            required={true}
            options={jobApplicationEventTypes.map((type) => [
              type,
              JobApplicationEventType[type as any],
            ])}
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

      <Modal
        title="Add Job Application"
        onClose={() => setAddModalIsOpen(false)}
        onConfirm={handleSubmitForm}
        isOpen={addModalIsOpen}
        isError={postJobApplicationError}
        isLoading={postJobApplicationIsLoading}
      >
        <JobApplicationForm
          form={jobApplicationForm}
          setFormValue={setFormValue}
        />
      </Modal>

      <Modal
        title="Delete Job Application"
        isOpen={deleteModalIsOpen}
        onConfirm={handleDelete}
        onClose={() => setDeleteModalIsOpen(false)}
        isError={deleteJobApplicationError}
        isLoading={deleteJobApplicationIsLoading}
      >
        <p>Would you like to delete this job application?</p>
      </Modal>
    </div>
  )
}
