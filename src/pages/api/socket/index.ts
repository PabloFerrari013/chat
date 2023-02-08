import CreateMessage from '@/utils/message/create'
import FindMessages from '@/utils/message/find'
import Unread from '@/utils/message/unread'
import UpdateMessage from '@/utils/message/update'
import { NextApiRequest } from 'next'
import { Server, Socket } from 'socket.io'

interface Message {
  to: string
  from: string
  message: string
  timestamp: string
}

interface Read {
  currentUser: string
  otherUser: string
}

interface Check {
  currentUser: string
  otherUser: string
}

let currentRoom = ''
let otherRoom = ''

const ioHandler = (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)

    io.on('connection', (socket: Socket) => {
      async function handleMsg() {
        if (!(otherRoom && currentRoom)) return

        const response = await FindMessages({
          otherUser: otherRoom,
          currentUser: currentRoom
        })

        socket.to(currentRoom).emit('messages', response)
        socket.to(otherRoom).emit('messages', response)
      }

      async function handleUnread() {
        console.log(otherRoom)

        if (!(otherRoom && currentRoom)) return

        const response = await Unread({
          currentUser: currentRoom,
          otherUser: otherRoom
        })

        socket.to(otherRoom).emit('unread', response)
        socket.to(currentRoom).emit('unread', response)
      }

      socket.on('room', async (userRoom: string) => {
        currentRoom = userRoom
        socket.join(userRoom)
      })

      socket.on('read', async ({ currentUser, otherUser }: Read) => {
        otherRoom = otherUser

        await UpdateMessage({ currentUser, otherUser })
        await handleMsg()
        await handleUnread()
      })

      socket.on('message', async (message: Message) => {
        await CreateMessage(message)

        socket.to(otherRoom).emit('check', currentRoom)
        socket.to(currentRoom).emit('check', otherRoom)

        await handleMsg()
        await handleUnread()
      })

      socket.on('check', async ({ currentUser, otherUser }: Check) => {
        if (!(currentUser && otherUser)) return

        await UpdateMessage({ currentUser, otherUser })
        await handleMsg()
      })

      socket.on('unread', async (otherUser: string) => {
        otherRoom = otherUser

        await handleUnread()
      })
    })

    res.socket.server.io = io
  }

  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler
