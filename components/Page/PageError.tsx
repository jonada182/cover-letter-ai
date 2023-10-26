import { APIError } from "@/types";
import React from "react";
import { FiAlertCircle, FiInfo } from "react-icons/fi";

type Props = {
  error?: Error | APIError | null;
};

enum ErrorType {
  "error",
  "warning",
  "hidden",
}

const ErrorMessage = ({ error }: Props) => {
  let message = "Something went wrong";
  let type: ErrorType = ErrorType.error;
  let errorClassname = "bg-pink-200 text-pink-800";
  let errorIcon = <FiAlertCircle className="text-4xl" />;
  switch (error?.message) {
    case "career profile not found":
      type = ErrorType.warning;
      message = "You haven't created a career profile with this email yet";
      break;
    case "no job applications found":
      type = ErrorType.hidden;
      break;
    default:
      message = error?.message || message;
      break;
  }

  if (type == ErrorType.hidden) {
    return null;
  }

  if (type == ErrorType.warning) {
    errorIcon = <FiInfo className="text-4xl" />;
    errorClassname = "bg-blue-200 text-blue-800";
  }

  return (
    <div
      className={`flex place-items-center gap-4 px-6 py-4 rounded mb-4 text-sm ${errorClassname}`}
    >
      {errorIcon}
      <p>{message}</p>
    </div>
  );
};

const PageError = (props: Props) => {
  if (!props.error) {
    return null;
  }
  return <ErrorMessage error={props.error} />;
};

export default PageError;
