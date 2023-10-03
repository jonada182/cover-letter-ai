import React, { useEffect, useState } from "react"
import { FormButton } from "../../../components/Form"
import { downloadPDF } from "@/utils/pdf"

type Props = {
  content?: string | undefined
  filename?: string | ""
  handleReset: () => void
}

const CoverLetter = (props: Props) => {
  const [coverLetterText, setCoverLetterText] = useState<string>(() => (props.content ?? ""))
  useEffect(() => {
    if (props.content) {
      setCoverLetterText(props.content)
    }
  }, [props.content])

  if (coverLetterText == "") {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="
          whitespace-pre-line
          shadow-md
          p-12
          bg-white
          text-black border
          border-gray-200
          h-80
          max-h-screen
          font-sans
        "
        onChange={(e) => setCoverLetterText(e.target.value)}
        value={coverLetterText}
      />
      <div className="flex flex-grow align-middle justify-end gap-6">
        <FormButton text="New Cover Letter" onClick={props.handleReset} />
        <FormButton text="Download PDF" onClick={() => downloadPDF(coverLetterText, props.filename)} />
      </div>
    </div>
  )
}

export default CoverLetter
