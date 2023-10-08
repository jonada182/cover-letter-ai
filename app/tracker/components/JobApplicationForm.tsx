import React, { ChangeEvent } from "react"
import { FormInput } from "@/components/Form"
import { JobApplication } from "@/types"

type Props = {
  form: JobApplication
  setFormValue: (event: ChangeEvent<HTMLInputElement>) => void
}

const JobApplicationForm = ({
  form,
  setFormValue,
}: Props) => {
  return (
    <div>
      <FormInput
        type="text"
        name="company_name"
        labelName="Company Name"
        placeholder="Eg. Acme Inc"
        required={true}
        handleOnChange={setFormValue}
        value={form.company_name}
      />
      <FormInput
        type="text"
        name="job_role"
        labelName="Job Role"
        placeholder="Eg. Manager"
        required={true}
        handleOnChange={setFormValue}
        value={form.job_role}
      />
      <FormInput
        type="url"
        name="url"
        labelName="Job Posting URL"
        placeholder="Eg. https://linkedin.com"
        handleOnChange={setFormValue}
        value={form.url}
      />
    </div>
  )
}

export default JobApplicationForm
