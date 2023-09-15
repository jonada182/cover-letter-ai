import React from "react"
import Image from "next/image"
import LinkedInBtn from "@/public/img/linkedin-btn.png"

type Props = {

}

const handleOnClick = () => {
  const linkedInClientID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
  const redirectURI = process.env.NEXT_PUBLIC_API_BASE_URL + "/linkedin/callback"
  const state = btoa(JSON.stringify({
    redirect_uri: window.location.origin
  }))
  const scopes = ["openid", "profile", "email"]
  const oAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInClientID}&redirect_uri=${redirectURI}&state=${state}&scope=${scopes.join(" ")}`
  window.location.href = oAuthURL
}

const SignInButton = (props: Props) => {
  return (
    <button onClick={handleOnClick} className="flex max-w-fit h-12 hover:opacity-80 transition-all">
      <Image className="flex-grow h-full w-fit" src={LinkedInBtn} alt="Sign in with LinkedIn" />
    </button>
  )
}

export default SignInButton
