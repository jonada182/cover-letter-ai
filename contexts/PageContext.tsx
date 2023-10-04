import { APIError } from "@/types";
import React, { createContext, useContext, useState } from "react"

type Props = {
  children: React.ReactNode
}

interface PageContextType {
  loading: boolean
  error: Error | APIError | null
  centerPage: boolean
  backgroundImage: boolean
  setLoading: (loading: boolean) => void
  setError: (error: Error | APIError | null) => void
  setCenterPage: (centerPage: boolean) => void
  setBackgroundImage: (backgroundImage: boolean) => void
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | APIError | null>(null);
  const [centerPage, setCenterPage] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<boolean>(false);
  return (
    <PageContext.Provider value={{ loading, error, centerPage, backgroundImage, setLoading, setError, setCenterPage, setBackgroundImage }}>
      {children}
    </PageContext.Provider>
  );
}

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};
