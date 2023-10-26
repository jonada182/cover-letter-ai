import { JobApplicationEventType } from "@/types";
import React from "react";

type Props = {
  eventType: JobApplicationEventType;
};

const getBadgeColour = (
  type: JobApplicationEventType = JobApplicationEventType.Interview
) => {
  switch (type) {
    case JobApplicationEventType.Submission:
      return "bg-gray-200 text-gray-900";
    case JobApplicationEventType.Interview:
      return "bg-yellow-200 text-yellow-900";
    case JobApplicationEventType.Rejection:
      return "bg-red-200 text-red-900";
    case JobApplicationEventType.Offer:
      return "bg-green-200 text-green-900";
    default:
      return "bg-blue-200 text-blue-900";
  }
};

const EventTypeBadge = (props: Props) => {
  return (
    <div
      className={`px-[6px] py-[6px] rounded-sm text-xs uppercase w-24 text-center ${getBadgeColour(
        props.eventType
      )}`}
    >
      {JobApplicationEventType[props.eventType]}
    </div>
  );
};

export default EventTypeBadge;
