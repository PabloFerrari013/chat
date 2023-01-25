import React, { useEffect } from 'react'
import { useSocket } from '@/hooks/useSocket'

export default function Home() {
  const socket = useSocket('123abc')

  const initializeSocket = async () => {
    try {
      socket?.emit('message', 'teste')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (socket) {
      initializeSocket()
    }
  }, [socket])
  return <>Olá mundo</>
}
