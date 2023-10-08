import React, { memo } from "react";
import { PiTrashThin } from "react-icons/pi";
import Tooltip from "@/components/Tooltip";
import {
  JobApplication,
  JobApplicationEventType,
} from "@/types";
import { dateFromNow, formatDate } from "@/utils";

type Props = {
  jobApplication: JobApplication;
  handleDelete: (index: number) => void;
};

const JobApplicationEvents = ({
  jobApplication,
  handleDelete,
}: Props) => {
  return (
    <div>
      {jobApplication.events?.map((event, index) => {
        event.showNotes = false;
        return (
          <div
            className="flex gap-4 py-2 px-4 justify-between items-center border-t relative text-xs"
            key={index}
          >
            <div className="p-2 bg-blue-200 rounded-sm text-xs uppercase w-24 text-center">
              {JobApplicationEventType[event.type]}
            </div>
            <div className="flex-grow" title={event.additional_notes}>
              {event.description}
              {event.showNotes && <div>{event.additional_notes}</div>}
            </div>
            <div className="text-xs text-gray-400 font-light">
              <Tooltip text={formatDate(event.date)}>
                {dateFromNow(event.date)}
              </Tooltip>
            </div>
            <button
              className="btn-icon"
              onClick={() => handleDelete(index)}
            >
              <PiTrashThin />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default memo(JobApplicationEvents);
