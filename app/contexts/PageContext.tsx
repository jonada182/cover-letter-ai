import React, { createContext, useContext, useState } from 'react'

type Props = {
  children: React.ReactNode
}

interface PageContextType {
  loading: boolean;
  error: Error | null;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({children}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <PageContext.Provider value={{ loading, error, setLoading, setError }}>
      {children}
    </PageContext.Provider>
  );
}

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePageContext must be used within a PageProvider');
  }
  return context;
};