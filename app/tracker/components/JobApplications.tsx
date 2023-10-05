import React from "react";
import Link from "next/link";
import {
  PiCalendarPlusThin,
  PiLinkThin,
  PiPencilThin,
  PiTrashThin,
} from "react-icons/pi";
import { JobApplication, JobApplicationEvent } from "@/types";
import { dateFromNow, formatDate, isValidURL } from "@/utils";
import JobApplicationEvents from "./JobApplicationEvents";
import Tooltip from "@/components/Tooltip";
import { UUID } from "crypto";

type Props = {
  jobApplications: JobApplication[] | undefined;
  handleEditApplication: (jobApplication: JobApplication) => void;
  handleDeleteApplication: (jobApplicationId: UUID | null | undefined) => void;
  handleAddEvent: (jobApplicationId: UUID | null | undefined) => void;
  handleEventNotesToggle: (event: JobApplicationEvent) => void;
  handleEventDelete: (
    jobApplicationId: UUID | null | undefined,
    index: number
  ) => void;
};

const JobApplications = ({
  jobApplications,
  handleEditApplication,
  handleDeleteApplication,
  handleAddEvent,
  handleEventNotesToggle,
  handleEventDelete,
}: Props) => {
  return (
    <div>
      {!jobApplications && (
        <div className="p-4 text-center text-gray-400">
          You haven`t added any job applications yet
        </div>
      )}
      {jobApplications?.map((jobApplication) => (
        <div
          key={jobApplication.id}
          className="flex flex-col bg-white border-t border-gray-200 first:border-0"
        >
          <div className="flex items-center justify-stretch">
            <div className="flex-grow border-r border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-blue-900 capitalize">
                  {jobApplication.job_role}
                </div>
                <div className="text-xs text-gray-400 font-light">
                  <Tooltip text={formatDate(jobApplication.updated_at)}>
                    {dateFromNow(jobApplication.updated_at)}
                  </Tooltip>
                </div>
              </div>
              <div className="text-xs capitalize">
                {jobApplication.company_name}
              </div>
            </div>
            <div className="w-1/3 md:w-1/4 flex justify-center items-center p-4 gap-2">
              <button
                className="btn-icon"
                onClick={() => handleAddEvent(jobApplication.id)}
              >
                <PiCalendarPlusThin />
              </button>
              {jobApplication.url && isValidURL(jobApplication.url) && (
                <Link
                  className="btn-icon"
                  target="_blank"
                  href={jobApplication.url}
                >
                  <PiLinkThin />
                </Link>
              )}
              <button
                className="btn-icon"
                onClick={() => handleEditApplication(jobApplication)}
              >
                <PiPencilThin />
              </button>
              <button
                className="btn-icon"
                onClick={() => handleDeleteApplication(jobApplication.id)}
              >
                <PiTrashThin />
              </button>
            </div>
          </div>
          <JobApplicationEvents
            jobApplication={jobApplication}
            handleDelete={handleEventDelete}
            handleToggle={handleEventNotesToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default JobApplications;
