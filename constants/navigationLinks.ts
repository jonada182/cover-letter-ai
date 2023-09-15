import { NavigationLink } from "@/types";

export const navigationLinks: NavigationLink[] = [
  {
    path: "/",
    name: "Welcome",
    isHidden: true,
  },
  {
    path: "/cover-letter",
    name: "Cover Letter",
    description: "Generate professional cover letters by providing all the details about your next job opportunity",
  },
  {
    path: "/career-profile",
    name: "Career Profile",
    description: "Get better results from cover letters by adding information about your career",
  },
  {
    path: "/tracker",
    name: "Job Tracker",
    description: "Keep track of your job applications"
  }
]
