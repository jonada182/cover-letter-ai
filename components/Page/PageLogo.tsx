import React from "react"

type Props = {
    title?: string | undefined
}

const PageLogo = ({ title }: Props) => {
  return (
    <div className="flex-grow-0 bg-blue-900 text-white rounded-r-full pr-2">
        <h4 className="p-6 font-bold">{title ? title : "CoverLetterAI"}</h4>
    </div>
  )
}

export default PageLogo