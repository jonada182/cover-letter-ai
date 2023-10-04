"use client"
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import Login from "@/components/Login";

export default function Page() {
  const { setCenterPage, setBackgroundImage } = usePageContext()

  useEffect(() => {
    setCenterPage(true)
    setBackgroundImage(true)
  }, [setBackgroundImage, setCenterPage])

  return <Login />
}
