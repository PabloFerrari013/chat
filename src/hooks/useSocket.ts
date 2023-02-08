import { useState, useEffect } from 'react'
import { setupSocket } from '../services/socket'
import * as SocketIOClient from 'socket.io'
import { useSession } from './useSession'

export function useSocket() {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null)
  const { session } = useSession()

  useEffect(() => {
    if (session) {
      setupSocket(session?.email).then(s => {
        setSocket(s)
      })
    }

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [session])

  return socket
}
