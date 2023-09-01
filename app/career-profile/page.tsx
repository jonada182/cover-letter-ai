import { Form, FormButton, FormInput } from "@/components/Form"
import PageTemplate from '@/components/PageTemplate'

export default function CareerProfile() {
  return (
    <PageTemplate>
      <Form>
        <FormInput type="text" labelName="First Name" name="first_name" placeholder="John"/>
        <FormInput type="text" labelName="Last Name" name="last_name" placeholder="Doe"/>
        <FormInput type="text" labelName="Headline" name="headline" placeholder="CEO"/>
        <FormInput type="number" labelName="Experience Years" name="experience_years" placeholder="10" min={1}/>
        <FormInput type="text" labelName="Skills" name="skills" placeholder="sales, accounting, etc."/>
        <FormInput type="text" labelName="Summary" name="summary" placeholder="I am a professional ..."/>
        <h4 className="text-gray-600 border-b-gray-300 border-b-2 py-4 mb-4">Contact Info</h4>
        <FormInput type="email" labelName="Email" name="email" placeholder="your@email.com"/>
        <FormInput type="text" labelName="Address" name="address" placeholder="123 Street"/>
        <FormInput type="text" labelName="Phone Number" name="phone" placeholder="555-555-5555"/>
        <FormInput type="url" labelName="Website" name="website" placeholder="mywebsite.com"/>
        <FormButton text="Create Career profile" id="submit_career_profile"/>
      </Form>
    </PageTemplate>
  )
}
