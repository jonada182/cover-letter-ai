import React from "react"
import Logo from "@/public/img/logo.png"
import Image from "next/image"
import Link from "next/link"

type Props = {
  title?: string | undefined
}

const PageLogo = ({ title }: Props) => {
  return (
    <div className="flex-grow-0 flex flex-row items-center bg-blue-900 text-white rounded-r-full pr-2">
      <Link href={"/"}>
        <Image className="p-6 max-w-xs" src={Logo} alt="CoverLetterAI" />
      </Link>
    </div>
  )
}

export default PageLogo
