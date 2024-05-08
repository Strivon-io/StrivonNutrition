import { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthContextType {
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  setAccessToken: (accessToken: string | null) => void
  setRefreshToken: (accessToken: string | null) => void
  deleteToken: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const deleteToken = async () => {
    setAccessToken(null)
    await AsyncStorage.removeItem('accessToken')
  }

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('accessToken')
      if (token) {
        setAccessToken(token)
      }
      setIsLoading(false)
    }

    fetchToken()
  }, [])

  useEffect(() => {
    if (accessToken) {
      AsyncStorage.setItem('accessToken', accessToken)
    }
    if (refreshToken) {
      AsyncStorage.setItem('refreshToken', refreshToken)
    }
  }, [accessToken, refreshToken])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        isLoading,
        deleteToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
