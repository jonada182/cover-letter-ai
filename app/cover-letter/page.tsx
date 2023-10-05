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
import { usePageContext } from "@/contexts/PageContext";
import { useUserContext } from "@/contexts/UserContext";
import { JobPosting } from "@/types";
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form";
import { PageLoading } from "@/components/Page";

const initialJobPosting: JobPosting = {
  company_name: "",
  job_details: "",
  job_role: "",
  skills: "",
};

export default function Page() {
  const [jobPostingForm, setJobPostingForm] =
    useState<JobPosting>(initialJobPosting);
  const { setError, setLoading } = usePageContext();
  const { profileId, linkedInAccessToken } = useUserContext();
  const {
    data: coverLetter,
    error: coverLetterError,
    isLoading: coverLetterLoading,
    mutate: submitCoverLetter,
    reset: resetCoverLetter,
  } = usePostCoverLetter();

  useEffect(() => {
    setLoading(coverLetterLoading);
    setError(coverLetterError);
  }, [coverLetterError, coverLetterLoading]);

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
      access_token: linkedInAccessToken,
    });
  };

  if (coverLetterLoading) {
    return null;
  }

  const CoverLetter = dynamic(
    () => import("@/app/cover-letter/components/CoverLetter"),
    {
      ssr: false,
      loading: () => <PageLoading loading={true} />,
    }
  );

  if (coverLetter) {
    return (
      <CoverLetter
        content={coverLetter}
        filename={jobPostingForm?.company_name}
        handleReset={resetCoverLetter}
      />
    );
  }

  return (
    <>
      <div className="p-4 mb-6 bg-blue-200 text-blue-900 text-sm rounded">
        Don`t forget to{" "}
        <Link
          className="font-bold hover:underline text-pink-700"
          href={"/career-profile"}
        >
          update your career profile
        </Link>{" "}
        for personalized cover letters
      </div>
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
