import React, { memo } from "react";
import Link from "next/link";
import {
  PiLinkThin,
  PiTrashThin,
} from "react-icons/pi";
import { JobApplication } from "@/types";
import { dateFromNow, isValidURL } from "@/utils";
import { UUID } from "crypto";

type Props = {
  jobApplications: JobApplication[] | undefined;
  isLoading: boolean;
  handleDeleteApplication: (jobApplicationId: UUID | null | undefined) => void;
};

const JobApplications = ({
  jobApplications,
  isLoading,
  handleDeleteApplication,
}: Props) => {

  if (isLoading) {
    return <div className="p-4 text-center text-gray-400 animate-pulse">Loading job applications...</div>
  }

  if (!jobApplications) {
    return (
      <div className="p-4 text-center text-gray-400">
        You haven`t added any job applications yet
      </div>
    )
  }

  return (
    <div className="shadow rounded overflow-hidden">
      {jobApplications?.map((jobApplication) => (
        <div
          key={jobApplication.id}
          className="flex flex-col bg-white border-t border-gray-200 first:border-0"
        >
          <div className="flex items-center justify-stretch">
            <Link className="group flex-grow flex flex-col gap-1 p-4" href={`/tracker/${jobApplication.id}`}>
              <div
                className="text-base font-bold text-blue-900 capitalize group-hover:underline"
              >
                {jobApplication.job_role}
              </div>
              <div className="text-sm capitalize">
                {jobApplication.company_name}
              </div>
              <div className="text-xs text-gray-400 font-light flex-grow-0">
                {`Updated ${dateFromNow(jobApplication.updated_at)}`}
              </div>
            </Link>
            <div className="w-1/5 lg:w-1/6 flex justify-end items-center p-4 gap-2">
              {jobApplication.url && isValidURL(jobApplication.url) && (
                <Link
                  className="btn-icon"
                  target="_blank"
                  href={jobApplication.url}
                  title="Visit application website"
                >
                  <PiLinkThin />
                </Link>
              )}
              <button
                className="btn-icon"
                onClick={() => handleDeleteApplication(jobApplication.id)}
                title="Delete job application"
              >
                <PiTrashThin />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(JobApplications);
