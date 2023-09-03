'use client'
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form"
// import { useGetCareerProfile } from "@/hooks"
import { CareerProfile } from "@/types"
import { ChangeEvent, FormEvent, useState } from "react"

export default function Page() {
  const initialProfile: CareerProfile = {
    first_name: '',
    last_name: '',
    headline: '',
    experience_years: 0,
    summary: '',
    skills: [],
    contact_info: {
      email: '',
      address: '',
      phone: '',
      website: '',
    },
  };
  const [careerProfile, setCareerProfile] = useState<CareerProfile>(initialProfile)
  const setFormValue = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const name = event.target.name
    setCareerProfile((prev) => {
      if (name.startsWith('contact_info.')) {
        const contactInfoProperty = name.split('.')[1];
        return {
          ...prev,
          contact_info: {
            ...prev.contact_info,
            [contactInfoProperty]: value,
          },
        }
      }
      return {
        ...prev,
        [name]: name === 'skills' ? value.split(',') : value,
      }
    })
  }

  const submitCareerProfileForm = (event: FormEvent) => {
    event.preventDefault();
    console.log("Career Profile", careerProfile);
  }
  // const { data, isLoading, error, refetch } = useGetCareerProfile({ email: careerProfile.contactInfo.email, isEnabled: false })
  // if (isLoading) {
  //   // show loading
  // }

  // if (error instanceof Error) {
  //   // show error
  // }
  return (
    <div>
      <Form handleOnSubmit={submitCareerProfileForm}>
        <FormInput
          type="email"
          labelName="Email"
          name="contact_info.email"
          placeholder="your@email.com"
          value={careerProfile.contact_info.email}
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormInput
          type="text" 
          labelName="First Name"
          name="first_name" 
          placeholder="John" 
          value={careerProfile.first_name} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormInput
          type="text" 
          labelName="Last Name"
          name="last_name" 
          placeholder="Doe" 
          value={careerProfile.last_name} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormInput
          type="text" 
          labelName="Headline"
          name="headline" 
          placeholder="CEO" 
          value={careerProfile.headline} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormInput
          type="number" 
          labelName="Experience Years"
          name="experience_years" 
          placeholder="10" 
          min={1} 
          value={careerProfile.experience_years} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormInput
          type="text" 
          labelName="Skills"
          name="skills" 
          placeholder="sales, accounting, etc."
          value={careerProfile.skills} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormTextarea 
          labelName="Summary" 
          name="summary" 
          placeholder="I am a professional ..." 
          value={careerProfile.summary} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <h4 className="text-gray-600 border-b-gray-300 border-b-2 py-4 mb-4">Contact Info</h4>
        <FormInput 
          type="text" 
          labelName="Address" 
          name="contact_info.address" 
          placeholder="123 Street" 
          value={careerProfile.contact_info.address} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormInput 
          type="text" 
          labelName="Phone Number" 
          name="contact_info.phone" 
          placeholder="555-555-5555" 
          value={careerProfile.contact_info.phone} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormInput 
          type="url" 
          labelName="Website" 
          name="contact_info.website" 
          placeholder="mywebsite.com" 
          value={careerProfile.contact_info.website} 
          handleOnChange={(e) => setFormValue(e)}
        />
        <FormButton text="Create Career profile" id="submit_career_profile"/>
      </Form>
    </div>
  )
}
