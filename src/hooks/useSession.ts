import { SessionContext } from '@/contexts/sessionContext'
import { useContext } from 'react'

export function useSession() {
  return useContext(SessionContext)
}
