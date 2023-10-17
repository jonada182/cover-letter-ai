"use client";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UUID } from "crypto";
import useJobApplications from "@/app/tracker/hooks/useJobApplications";
import { JobApplication } from "@/types";
import { useUserContext } from "@/contexts/UserContext";
import { FormButton } from "@/components/Form";
import Modal from "@/components/Modal";
import JobApplications from "./components/JobApplications";
import useJobApplication from "./hooks/useJobApplication";
import JobApplicationForm from "./components/JobApplicationForm";

const initialJobApplication: JobApplication = {
  company_name: "",
  job_role: "",
  url: "",
};

export default function Page() {
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

  const [deleteId, setDeleteId] = useState<UUID | null>(null);

  const [jobApplicationForm, setJobApplicationForm] = useState<JobApplication>(
    initialJobApplication
  );

  const { profileId, linkedInAccessToken } = useUserContext();

  const {
    data: jobApplications,
    fetchError: jobApplicationsError,
    fetchIsLoading: jobApplicationsLoading,
    refetch: fetchJobApplications,
  } = useJobApplications();

  const {
    postError: postJobApplicationError,
    postIsLoading: postJobApplicationIsLoading,
    postIsSuccess: postJobApplicationSuccess,
    deleteError: deleteJobApplicationError,
    deleteIsLoading: deleteJobApplicationIsLoading,
    deleteIsSuccess: deleteJobApplicationSuccess,
    mutate: postJobApplication,
    deleteApplication: deleteJobApplication,
    reset: resetPostJobApplication,
  } = useJobApplication({ isEnabled: false });

  useEffect(() => {
    if (postJobApplicationSuccess) {
      fetchJobApplications();
      resetPostJobApplication();
      setJobApplicationForm(initialJobApplication);
      setAddModalIsOpen(false);
    }
  }, [postJobApplicationSuccess]);

  useEffect(() => {
    if (deleteJobApplicationSuccess) {
      fetchJobApplications();
      setDeleteModalIsOpen(false);
      setDeleteId(null);
    }
  }, [deleteJobApplicationSuccess]);

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
    if (deleteId) {
      deleteJobApplication({
        jobApplicationId: deleteId,
        accessToken: linkedInAccessToken,
        profileId: profileId,
      });
    }
  };

  const handleConfirmDelete = useCallback((jobApplicationId: UUID | null | undefined) => {
    if (jobApplicationId) {
      setDeleteId(jobApplicationId);
      setDeleteModalIsOpen(true);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between mb-4">
        <h2 className="text-lg font-bold py-4">
          Job Applications
        </h2>
        <FormButton
          text="Add Job Application"
          onClick={() => setAddModalIsOpen(true)}
        />
      </div>

      <JobApplications
        jobApplications={jobApplications}
        isLoading={jobApplicationsLoading}
        handleDeleteApplication={handleConfirmDelete}
      />

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
    </>
  );
}
