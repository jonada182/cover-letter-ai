"use client"
import SignInButton from "@/components/SignInButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserContext } from "./contexts/UserContext";
import { useGetCareerProfile } from "@/hooks";
import Image from "next/image";
import { FormButton } from "@/components/Form";
import { PiFileTextThin, PiSuitcaseSimpleThin, PiUserListThin } from "react-icons/pi"
import Link from "next/link";
import { usePageContext } from "./contexts/PageContext";

export default function Page() {
  const {
    isLoggedIn,
    profileId,
    isLoading: userIsLoading,
    setLinkedInAccessToken,
    signOut
  } = useUserContext()
  const { loading: pageIsLoading, setLoading, setError } = usePageContext()
  const queryParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { data: careerProfile, isLoading: careerProfileIsLoading, error: careerProfileError } = useGetCareerProfile({ profile_id: profileId, isEnabled: false })

  useEffect(() => {
    const accessToken = queryParams.get("access_token")
    if (accessToken && accessToken !== "") {
      setLinkedInAccessToken(accessToken)
      router.replace(pathname)
    }
  }, [pathname, queryParams, router, setLinkedInAccessToken])

  useEffect(() => {
    if (userIsLoading || careerProfileIsLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [userIsLoading, careerProfileIsLoading])

  useEffect(() => {
    if (careerProfileError) {
      setError(careerProfileError)
    } else {
      setError(null)
    }
  }, [careerProfileError])

  if (!isLoggedIn && !pageIsLoading) {
    return (
      <div className="flex w-full justify-center">
        <div className="flex flex-col max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex w-full h-36 relative bg-gray-50">
            <div className="flex gap-2 justify-center flex-col z-20 relative p-12 text-white">
              <h1 className="text-3xl">Welcome</h1>
              <p className="opacity-60 text-xs">CoverLetterAI crafts compelling and personalized cover letters in minutes</p>
            </div>
            <div className="opacity-80 bg-gradient-to-t from-blue-900 to-blue-700 flex-grow w-full h-full absolute z-10"></div>
            <Image src="/img/banner-bg.jpg" alt="Jobs" className="object-cover -z-0 object-right" fill={true} />
          </div>
          <div className="flex flex-col p-6 align-middle justify-center items-center h-36">
            <SignInButton />
          </div>
        </div>
      </div>
    )
  }
  if (isLoggedIn) {
    return (
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex w-full h-48 md:h-64 relative bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between flex-col z-20 relative p-6 md:p-12">
              <h1 className="text-3xl">{careerProfile && `Hi, ${careerProfile.first_name}`}</h1>
              <FormButton text="Sign out" onClick={() => signOut()} />
            </div>
            <div className="opacity-25 bg-gradient-to-t from-black flex-grow w-full h-full absolute z-10"></div>
            <Image src="/img/jobs-bg.jpg" alt="Jobs" className="object-cover -z-0 object-right" fill={true} />
          </div>
          <div className="flex md:flex-row flex-col gap-6">
            <Link href={"/cover-letter"} className="flex flex-col hover:opacity-80 transition-all p-6 text-center gap-2 items-center justify-center w-full h-46 rounded-xl shadow-lg bg-gradient-to-t from-blue-900 bg-blue-700 text-white">
              <PiFileTextThin className="text-4xl" />
              <h3 className="text-lg">Cover Letters</h3>
            </Link>
            <Link href={"/tracker"} className="flex flex-col hover:opacity-80 transition-all p-6 text-center gap-2 items-center justify-center w-full h-46 rounded-xl shadow-lg bg-gradient-to-t from-pink-900 bg-pink-700 text-white">
              <PiSuitcaseSimpleThin className="text-4xl" />
              <h3 className="text-lg">Job Applications</h3>
            </Link>
            <Link href={"/career-profile"} className="flex flex-col hover:opacity-80 transition-all p-6 text-center gap-2 items-center justify-center w-full h-46 rounded-xl shadow-lg bg-gradient-to-t from-gray-900 bg-gray-700 text-white">
              <PiUserListThin className="text-4xl" />
              <h3 className="text-lg">My Profile</h3>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
