import React from 'react'

type Props = {
    children: React.ReactNode
}

const Form = ({ children }: Props) => {
  return (
    <form>
      {children}
    </form>
  )
}

export default Form
