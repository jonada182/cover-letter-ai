import React from "react"
import Logo from "@/app/logo.png"
import Image from "next/image"

type Props = {
  title?: string | undefined
}

const PageLogo = ({ title }: Props) => {
  return (
    <div className="flex-grow-0 flex flex-row items-center bg-blue-900 text-white rounded-r-full pr-2">
      <Image className="p-6 max-w-min" src={Logo} alt="CoverLetterAI" />
    </div>
  )
}

export default PageLogo
