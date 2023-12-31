import React, { FormEvent, memo } from "react";

type Props = {
  children: React.ReactNode;
  handleOnSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

const Form = ({ children, handleOnSubmit }: Props) => {
  return <form onSubmit={handleOnSubmit}>{children}</form>;
};

export default memo(Form);
