'use client'
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form"

export default function Home() {
  return (
    <div>
      <Form>
        <FormInput type="email" labelName="Email" name="email" placeholder="your@email.com"/>
        <h4 className="text-gray-600 border-b-gray-300 border-b-2 py-4 mb-4">Job Details</h4>
        <FormInput type="text" labelName="Company Name" name="company_name" placeholder="Acme Inc"/>
        <FormInput type="text" labelName="Job Role" name="job_role" placeholder="CEO"/>
        <FormTextarea labelName="Job Details" name="job_details" placeholder="Looking for a ..."/>
        <FormInput type="text" labelName="Skills" name="skills" placeholder="sales, accounting, etc."/>
        <FormButton text="Generate Cover Letter" id="submit_cover_letter"/>
      </Form>
    </div>
  )
}
