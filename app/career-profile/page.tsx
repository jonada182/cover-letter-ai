"use client"
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form"
import { useGetCareerProfile } from "@/hooks"
import { CareerProfile } from "@/types"
import { isValidEmail } from "@/utils"
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import { usePageContext } from "../contexts/PageContext"
import usePostCareerProfile from "@/hooks/usePostCareerProfile"
import { useUserContext } from "../contexts/UserContext"

const initialProfile: CareerProfile = {
  first_name: "",
  last_name: "",
  headline: "",
  experience_years: 0,
  summary: "",
  skills: [],
  contact_info: {
    email: "",
    address: "",
    phone: "",
    website: "",
  },
};

export default function Page() {
  const [careerProfile, setCareerProfile] = useState<CareerProfile>(initialProfile);
  const { setError, setLoading } = usePageContext();
  const { profileId, linkedInAccessToken } = useUserContext()

  const {
    data: existingCareerProfile,
    isLoading: getCareerProfileLoading,
    error: getCareerProfileError
  } = useGetCareerProfile({ profile_id: profileId, isEnabled: false });
  const {
    data: newCareerProfile,
    isLoading: postCareerProfileLoading,
    error: postCareerProfileError,
    mutate: postCareerProfile,
  } = usePostCareerProfile();
  const careerProfileError = useMemo(() => getCareerProfileError || postCareerProfileError, [getCareerProfileError, postCareerProfileError])
  const careerProfileLoading = useMemo(() => getCareerProfileLoading || postCareerProfileLoading, [getCareerProfileLoading, postCareerProfileLoading])
  const isUpdate = newCareerProfile || existingCareerProfile

  useEffect(() => {
    if (careerProfileError || careerProfileLoading) {
      setCareerProfile((prev) => ({
        ...initialProfile,
        contact_info: {
          ...initialProfile.contact_info,
          email: prev.contact_info.email,
        },
      }))
    }
    setLoading(careerProfileLoading)
    setError(careerProfileError)
  }, [careerProfileError, careerProfileLoading]);

  useEffect(() => {
    if (typeof existingCareerProfile !== "undefined") {
      setCareerProfile(existingCareerProfile)
    }
  }, [existingCareerProfile]);

  useEffect(() => {
    if (typeof newCareerProfile !== "undefined") {
      setCareerProfile(newCareerProfile)
    }
  }, [newCareerProfile]);

  const setFormValue = useCallback((event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const name = event.target.name
    setCareerProfile((prev) => {
      if (name.startsWith("contact_info.")) {
        const contactInfoProperty = name.split(".")[1];
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
        [name]: name === "skills" ? value.split(",") : value,
      }
    })
  }, [])

  const submitCareerProfileForm = (event: FormEvent) => {
    event.preventDefault();
    postCareerProfile({ careerProfile: careerProfile, access_token: linkedInAccessToken });
  }

  const hideForm = !isValidEmail(careerProfile.contact_info.email);

  return (
    <div>
      <Form handleOnSubmit={submitCareerProfileForm}>
        <div className="flex gap-8 justify-stretch flex-col md:flex-row">
          <div className="flex-grow">
            <FormInput
              type="text"
              labelName="First Name"
              name="first_name"
              placeholder="John"
              value={careerProfile.first_name}
              handleOnChange={setFormValue}
            />
            <FormInput
              type="text"
              labelName="Last Name"
              name="last_name"
              placeholder="Doe"
              value={careerProfile.last_name}
              handleOnChange={setFormValue}
            />
            <FormInput
              type="text"
              labelName="Headline"
              name="headline"
              placeholder="CEO"
              value={careerProfile.headline}
              handleOnChange={setFormValue}
              required={true}
            />
            <FormInput
              type="number"
              labelName="Experience Years"
              name="experience_years"
              placeholder="10"
              min={1}
              value={careerProfile.experience_years}
              handleOnChange={setFormValue}
              required={true}
            />
            <FormInput
              type="text"
              labelName="Skills"
              name="skills"
              placeholder="sales, accounting, etc."
              value={careerProfile.skills}
              handleOnChange={setFormValue}
            />
            <FormTextarea
              labelName="Summary"
              name="summary"
              placeholder="I am a professional ..."
              value={careerProfile.summary}
              handleOnChange={setFormValue}
            />
          </div>
          <div className="flex-grow">
            <h4 className="text-gray-600 border-b-gray-300 border-b-2 py-4 mb-4">Contact Info</h4>
            <FormInput
              type="email"
              labelName="Email"
              name="contact_info.email"
              placeholder="your@email.com"
              value={careerProfile.contact_info.email}
              handleOnChange={setFormValue}
              required={true}
            />
            <FormInput
              type="text"
              labelName="Address"
              name="contact_info.address"
              placeholder="123 Street"
              value={careerProfile.contact_info.address}
              handleOnChange={setFormValue}
            />
            <FormInput
              type="text"
              labelName="Phone Number"
              name="contact_info.phone"
              placeholder="555-555-5555"
              value={careerProfile.contact_info.phone}
              handleOnChange={setFormValue}
            />
            <FormInput
              type="url"
              labelName="Website"
              name="contact_info.website"
              placeholder="mywebsite.com"
              value={careerProfile.contact_info.website}
              handleOnChange={setFormValue}
            />
          </div>
        </div>
        <div className={hideForm ? "hidden" : ""}>
          <FormButton type="submit" text={`${isUpdate ? "Update" : "Create"} Career profile`} id="submit_career_profile" />
        </div>
      </Form>
    </div>
  )
}
