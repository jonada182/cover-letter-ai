import React, { FormEvent } from 'react'

type Props = {
    children: React.ReactNode,
    handleOnSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const Form = ({ children, handleOnSubmit }: Props) => {
  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      {children}
    </form>
  )
}

export default Form
