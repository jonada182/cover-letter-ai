"use client"
import { useGetJobApplications } from "@/hooks"
import { usePageContext } from "../contexts/PageContext"
import { useEffect } from "react"

export default function Page() {
  const {
    data: jobApplications,
    error: jobApplicationsError,
    isLoading: jobApplicationsLoading
  } = useGetJobApplications()

  const { setError, setLoading } = usePageContext()

  useEffect(() => {
    setError(jobApplicationsError)
    setLoading(jobApplicationsLoading)
  }, [jobApplicationsError, jobApplicationsLoading])

  return (
    <div>

    </div>
  )
}
