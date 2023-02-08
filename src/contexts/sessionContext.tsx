import { api } from '@/services/api'
import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'

interface Contact {
  id: string
  name: string
  email: string
  photoURL: string
}

interface Session {
  name: string
  email: string
  photoURL: string
  contacts: Contact[]
}

interface SessionResponse {
  user: Session | false
}

interface SessionContext {
  session?: Session | null
  setSession: (session: Session | null) => void
}

interface sessionProviderProps {
  children: React.ReactNode
}

export const SessionContext = createContext({} as SessionContext)

const SessionProvider: React.FC<sessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>()
  const router = useRouter()

  function handleSession(s: Session | null) {
    if (s) {
      window.localStorage.setItem('MyChat_', JSON.stringify(s.email))

      setSession(s)
    } else {
      window.localStorage.setItem('MyChat_', JSON.stringify(null))

      setSession(null)
    }
  }

  async function initializeSession() {
    const userEmail = window.localStorage.getItem('MyChat_')

    if (!userEmail || userEmail === 'null') {
      return
    }

    const email = JSON.parse(userEmail)

    if (!email) return

    try {
      const { data } = await api.get<SessionResponse>(`/user/find/${email}`)

      if (!data.user) return

      setSession(data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initializeSession()
  }, [])

  useEffect(() => {
    if (!session) router.push('/')
  }, [session])

  return (
    <SessionContext.Provider value={{ session, setSession: handleSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
