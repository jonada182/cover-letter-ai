import React, { useEffect } from "react";
import Image from "next/image";
import { PageError, PageHeader, PageHeading, PageLoading } from ".";
import { usePageContext } from "@/contexts/PageContext";
import { useUserContext } from "@/contexts/UserContext";

type Props = {
  children: React.ReactNode;
  loadingMessage: string
};

const PageTemplate = ({ children, loadingMessage }: Props) => {
  const {
    loading: isPageLoading,
    error: isPageError,
    currentNavigationLink,
  } = usePageContext();
  const { isLoggedIn, signOut } = useUserContext();

  useEffect(() => {
    if (isPageError && isPageError.message == "Unauthorized request" && isLoggedIn) {
      signOut()
    }
  }, [isPageError])

  if (!isLoggedIn && currentNavigationLink?.path !== "/login") {
    return (
      <div className="flex flex-col flex-grow items-center justify-center min-h-screen">
        <PageLoading loading={true} message={loadingMessage} />
      </div>
    );
  }

  return (
    <>
      <main className="flex flex-col min-h-screen items-center justify-stretch relative">
        <PageHeader />
        <div
          className={
            "flex flex-col content-center justify-stretch flex-grow z-10 max-w-5xl w-full p-6 transition-all"
          }
        >
          <PageHeading currentNavigationLink={currentNavigationLink} />
          <PageError error={isPageError} />
          <PageLoading loading={isPageLoading} message={loadingMessage} />
          {children}
        </div>
        {currentNavigationLink?.path == "/login" && (
          <Image
            src={"/img/background.jpg"}
            alt=""
            className="object-cover -z-0 object-center"
            fill={true}
          />
        )}
      </main>
    </>
  );
};

export default PageTemplate;
