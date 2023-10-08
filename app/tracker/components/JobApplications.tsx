import React, { memo } from "react";
import Link from "next/link";
import {
  PiLinkThin,
  PiTrashThin,
} from "react-icons/pi";
import { JobApplication } from "@/types";
import { dateFromNow, formatDate, isValidURL } from "@/utils";
import Tooltip from "@/components/Tooltip";
import { UUID } from "crypto";
import { PageLoading } from "@/components/Page";

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
    return <PageLoading loading={true} />
  }

  if (!jobApplications) {
    return (
      <div className="p-4 text-center text-gray-400">
        You haven`t added any job applications yet
      </div>
    )
  }

  return (
    <div>
      {jobApplications?.map((jobApplication) => (
        <div
          key={jobApplication.id}
          className="flex flex-col bg-white border-t border-gray-200 first:border-0"
        >
          <div className="flex items-center justify-stretch">
            <div className="flex-grow border-r border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-blue-900 capitalize">
                  <Link href={`/tracker/${jobApplication.id}`}>{jobApplication.job_role}</Link>
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
                onClick={() => handleDeleteApplication(jobApplication.id)}
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
