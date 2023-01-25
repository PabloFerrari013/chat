import { io } from 'socket.io-client'
import * as SocketIOClient from 'socket.io'
import { api } from './api'

export async function setupSocket(room: string) {
  await api.get('/socket')

  const socket: SocketIOClient.Socket | any = io()

  socket.emit('room', room)

  return socket
}
