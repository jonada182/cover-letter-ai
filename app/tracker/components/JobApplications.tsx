import React, { memo, useMemo, useState } from "react";
import Link from "next/link";
import { PiLinkThin, PiTrashThin } from "react-icons/pi";
import { JobApplication, JobApplicationEventType } from "@/types";
import { dateFromNow, isValidURL } from "@/utils";
import { UUID } from "crypto";
import FormButton from "@/components/Form/FormButton";
import { FormInput } from "@/components/Form";
import EventTypeBadge from "./EventTypeBadge";

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
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");

  const totalPages = useMemo(() => {
    if (jobApplications) {
      return Math.ceil(jobApplications?.length / pageSize);
    }
    return 0;
  }, [jobApplications]);

  const paginatedResults = useMemo(() => {
    const applications = jobApplications ? [...jobApplications] : [];
    if (filterTerm !== "") {
      const searchTerm = filterTerm.toLowerCase();
      return applications?.filter((jobApplication) => {
        if (
          jobApplication.company_name.toLowerCase().includes(searchTerm) ||
          jobApplication.job_role.toLowerCase().includes(searchTerm)
        ) {
          return jobApplication;
        }
        return false;
      });
    } else {
      return applications?.slice(0, currentPage * pageSize);
    }
  }, [jobApplications, currentPage, filterTerm]);

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-400 animate-pulse">
        Loading job applications...
      </div>
    );
  }

  if (!jobApplications || jobApplications.length == 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        You haven`t added any job applications yet
      </div>
    );
  }

  const loadMoreResults = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="flex justify-center sm:justify-stretch align-middle">
        <FormInput
          placeholder="Search by company or role..."
          handleOnChange={(e) => setFilterTerm(e.target.value)}
          name="job_application_filter_term"
          type="text"
          value={filterTerm}
        />
      </div>
      <div className="shadow rounded overflow-hidden">
        {paginatedResults?.map((jobApplication) => (
          <div
            key={jobApplication.id}
            className="flex flex-col bg-white border-t border-gray-200 first:border-0"
          >
            <div className="flex items-center justify-stretch">
              <Link
                className="group flex-grow flex flex-col md:flex-row items-stretch md:items-center justify-around gap-1 p-4"
                href={`/tracker/${jobApplication.id}`}
              >
                <div className="w-1/3 text-base font-semibold text-blue-900 capitalize group-hover:underline flex gap-2 items-center justify-stretch">
                  {jobApplication.job_role}
                </div>
                <div className="w-1/5 text-sm capitalize font-medium text-gray-600">
                  {jobApplication.company_name}
                </div>
                {jobApplication.events && jobApplication.events.length > 0 && (
                  <EventTypeBadge
                    eventType={
                      jobApplication.events[jobApplication.events.length - 1]
                        ?.type
                    }
                  />
                )}
                <div className="text-xs text-gray-400 font-light flex-grow-0">
                  {`Updated ${dateFromNow(jobApplication.updated_at)}`}
                </div>
              </Link>
              <div className="w-1/4 md:w-1/6 flex justify-end items-center p-4 gap-2">
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
      {currentPage < totalPages && filterTerm === "" && (
        <div className="flex justify-center p-6">
          <FormButton
            onClick={() => loadMoreResults()}
            text="Load more applications"
          />
        </div>
      )}
    </>
  );
};

export default memo(JobApplications);
