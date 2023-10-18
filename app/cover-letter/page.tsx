"use client";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import usePostCoverLetter from "@/app/cover-letter/hooks/usePostCoverLetter";
import { useUserContext } from "@/contexts/UserContext";
import { JobPosting } from "@/types";
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form";
import useJobApplication from "../tracker/hooks/useJobApplication";

const initialJobPosting: JobPosting = {
  company_name: "",
  job_details: "",
  job_role: "",
  skills: "",
};

export default function Page() {
  const [jobPostingForm, setJobPostingForm] =
    useState<JobPosting>(initialJobPosting);
  const [successfulMsg, setSuccessfulMsg] = useState<boolean>(true);
  const { profileId, linkedInAccessToken } = useUserContext();
  const {
    data: coverLetter,
    error: coverLetterError,
    isLoading: coverLetterLoading,
    mutate: submitCoverLetter,
    reset: resetCoverLetter,
  } = usePostCoverLetter();

  const {
    postData: postJobApplicationData,
    mutate: postJobApplication,
    postError: postJobApplicationError,
    postIsLoading: postJobApplicationIsLoading,
    postIsSuccess: postJobApplicationIsSuccess,
    reset: resetPostJobApplication,
  } = useJobApplication({ isEnabled: false });

  useEffect(() => {
    if (successfulMsg) {
      setTimeout(() => {
        setSuccessfulMsg(false);
        resetPostJobApplication();
      }, 5000);
    }
  }, [successfulMsg]);

  useEffect(() => {
    if (postJobApplicationIsSuccess) {
      resetCoverLetter();
      setJobPostingForm(initialJobPosting);
      setSuccessfulMsg(true);
    }
  }, [postJobApplicationIsSuccess]);

  const setFormValue = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      const value = event.target.value;
      const name = event.target.name;
      setJobPostingForm((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    []
  );

  const submitCoverLetterForm = (event: FormEvent) => {
    event.preventDefault();
    submitCoverLetter({
      coverLetterRequest: {
        profile_id: profileId,
        job_posting: jobPostingForm,
      },
      accessToken: linkedInAccessToken,
    });
  };

  const handleSaveJobApplication = useCallback(() => {
    postJobApplication({
      jobApplication: {
        company_name: jobPostingForm.company_name,
        job_role: jobPostingForm.job_role,
        profile_id: profileId,
      },
      accessToken: linkedInAccessToken,
    });
  }, [jobPostingForm, profileId, linkedInAccessToken]);

  if (coverLetterLoading || postJobApplicationIsLoading) {
    return null;
  }

  const CoverLetter = dynamic(
    () => import("@/app/cover-letter/components/CoverLetter"),
    {
      ssr: false,
    }
  );

  if (coverLetter) {
    return (
      <CoverLetter
        content={coverLetter}
        filename={jobPostingForm?.company_name}
        handleReset={resetCoverLetter}
        handleSaveApplication={handleSaveJobApplication}
      />
    );
  }

  return (
    <>
      <div className="p-4 mb-4 bg-blue-200 text-blue-900 text-sm rounded">
        Don&rsquo;t forget to{" "}
        <Link
          className="font-medium hover:underline text-pink-700"
          href={"/career-profile"}
        >
          update your career profile
        </Link>{" "}
        for personalized cover letters
      </div>
      {successfulMsg && postJobApplicationData && (
        <div className="bg-green-300 border text-green-950 p-4 mb-4 text-center text-sm rounded transition-all">
          {postJobApplicationData?.id ? (
            <Link
              className="font-medium underline"
              href={`/tracker/${postJobApplicationData.id}`}
            >
              Job Application
            </Link>
          ) : (
            "Job Application"
          )}{" "}
          was saved successfully
        </div>
      )}
      <Form handleOnSubmit={submitCoverLetterForm}>
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
        <FormButton
          type="submit"
          text="Generate Cover Letter"
          id="submit_cover_letter"
          disabled={!!!profileId}
        />
      </Form>
    </>
  );
}
