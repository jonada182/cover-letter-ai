import React from "react"
import SignInButton from "./SignInButton"
import Image from "next/image"
import Logo from "@/public/img/logo.png"

const Login = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex w-full h-44 relative bg-blue-900">
          <div className="flex gap-2 justify-center content-center flex-col z-20 relative p-12 text-white">
            <Image className="p-6 max-w-xs self-center" src={Logo} alt="CoverLetterAI" />
            <p className="opacity-60 text-xs">CoverLetterAI crafts compelling and personalized cover letters in minutes</p>
          </div>
        </div>
        <div className="flex flex-col p-6 align-middle justify-center items-center h-36">
          <SignInButton />
        </div>
      </div>
    </div>
  )
}

export default Login
