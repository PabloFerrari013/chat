import { NextApiRequest } from 'next'
import { Server, Socket } from 'socket.io'

const ioHandler = (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)

    io.on('connection', (socket: Socket) => {
      console.log('Socket.io connection established')

      socket.on('message', (message: string) => {
        console.log(message)
      })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler
