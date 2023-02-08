import { useSession } from '@/hooks/useSession'
import { useSocket } from '@/hooks/useSocket'
import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface UnreadsProps {
  email: string
}

interface UnreadResponse {
  data: {
    to: string
    from: string
    id: string
    message: string
    timestamp: string
    visualized: boolean
  }
}

const Unreads: React.FC<UnreadsProps> = ({ email }) => {
  const [unreads, setUnreads] = useState(0)
  const { session } = useSession()
  const socket = useSocket()

  useEffect(() => {
    socket?.emit('unread', email)
  }, [socket, session])

  socket?.on('unread', (data: UnreadResponse[]) => {
    setUnreads(0)

    data.forEach(unread => {
      if (unread.data.from === email) setUnreads(u => u + 1)
    })
  })

  if (unreads > 0) {
    return (
      <Flex
        ml="auto"
        w="1.5em"
        h="1.5em"
        rounded="full"
        bg="purple.600"
        flexShrink={0}
        my="auto"
      >
        <Text m="auto" color="whiteAlpha.800" fontWeight="bold" fontSize="1em">
          {unreads}
        </Text>
      </Flex>
    )
  }

  return <></>
}

export default Unreads
