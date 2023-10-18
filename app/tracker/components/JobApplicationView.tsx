import React, { memo } from "react";
import Link from "next/link";
import {
  PiClockThin,
  PiLinkThin,
  PiPencilThin,
  PiTrashThin,
} from "react-icons/pi";
import { UUID } from "crypto";
import { JobApplication } from "@/types";
import { formatDate, isValidURL } from "@/utils";
import JobApplicationEvents from "./JobApplicationEvents";
import { FormButton } from "@/components/Form";

type Props = {
  jobApplication: JobApplication | undefined;
  isLoading: boolean;
  handleEditApplication: (jobApplication: JobApplication) => void;
  handleDeleteApplication: (jobApplicationId: UUID | null | undefined) => void;
  handleAddEvent: (jobApplicationId: UUID | null | undefined) => void;
  handleEventDelete: (index: number) => void;
};

const JobApplicationView = ({
  jobApplication,
  isLoading,
  handleEditApplication,
  handleDeleteApplication,
  handleAddEvent,
  handleEventDelete,
}: Props) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-400 animate-pulse">
        Loading job application
      </div>
    );
  }

  if (!jobApplication) {
    return (
      <div className="p-4 text-center text-gray-400">
        This job application is not available
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col bg-white border-t border-gray-200 first:border-0 shadow rounded">
        <div className="flex items-center justify-stretch">
          <div className="flex-grow flex flex-col gap-2 p-4">
            <div className="text-2xl text-blue-900 capitalize font-semibold">
              {jobApplication.job_role}
            </div>
            <div className="text-lg text-pink-700 font-medium capitalize">
              {jobApplication.company_name}
            </div>
            <div className="text-sm text-gray-400 font-thin flex flex-grow items-center justify-stretch gap-2">
              <PiClockThin /> {formatDate(jobApplication.updated_at)}
            </div>
          </div>
          <div className="w-1/3 md:w-1/4 flex justify-end items-center p-4 gap-2">
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
              onClick={() => handleEditApplication(jobApplication)}
              title="Edit job application"
            >
              <PiPencilThin />
            </button>
            <button
              className="btn-icon"
              onClick={() => handleDeleteApplication(jobApplication.id)}
              title="Delete job application"
            >
              <PiTrashThin />
            </button>
          </div>
        </div>
        <div className="flex flex-grow items-center justify-between p-4">
          <h4 className="text-sm text-gray-400 font-medium">Events History</h4>
          <FormButton
            text="Track New Event"
            onClick={() => handleAddEvent(jobApplication.id)}
          />
        </div>
        <JobApplicationEvents
          jobApplication={jobApplication}
          handleDelete={handleEventDelete}
        />
      </div>
    </>
  );
};

export default memo(JobApplicationView);
