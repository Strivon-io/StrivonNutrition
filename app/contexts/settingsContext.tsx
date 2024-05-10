import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface SettingsContextType {
  language: string
  setLanguage: (language: string) => void
}
const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState('en')

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
