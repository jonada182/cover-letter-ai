"use client"
import Login from "@/components/Login";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isLoggedIn } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      console.log("here")
      router.back()
    }
  }, [router, isLoggedIn])

  return <Login />
}
