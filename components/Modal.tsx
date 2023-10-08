import React, { memo } from "react";
import Button, { ButtonColour } from "./Button";
import { APIError } from "@/types";
import { PageError, PageLoading } from "./Page";

type Props = {
  onClose: () => void;
  onConfirm?: (event: React.MouseEvent | React.FormEvent) => void;
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
  isError?: APIError | Error | null;
  isLoading?: boolean
};

const Modal = (props: Props) => {
  if (!props.isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
      <div className="modal relative p-6 bg-white w-full mx-6 max-w-lg rounded shadow-lg gap-4 flex flex-col text-sm">
        <h2 className="text-base font-semibold uppercase">{props.title}</h2>
        {props.isLoading && <PageLoading loading={true} />}
        {props.isError && <PageError error={props.isError} />}
        {!props.isLoading && props.children}
        <div className="flex items-center justify-end gap-4">
          <Button onClick={props.onClose} colour={ButtonColour.Pink}>
            Close
          </Button>
          {props.onConfirm && (
            <Button onClick={props.onConfirm} colour={ButtonColour.Blue}>
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Modal);
