import { useSession } from '@/hooks/useSession'
import { useSocket } from '@/hooks/useSocket'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ChatBox from '../ChatBox'
import MessageList from '../MessageList'
import Top from '../Top'

interface User {
  id: string
  name: string
  email: string
  photoURL: string
}

interface Message {
  data: {
    to: string
    from: string
    key: string
    id: string
    message: string
    timestamp: string
    visualized: boolean
  }
}

interface ChatProps {
  activeUser: User | null
  setActiveUser: Dispatch<SetStateAction<User | null>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
}

const Chat: React.FC<ChatProps> = ({
  activeUser,
  setActiveUser,
  loading,
  setLoading,
  messages,
  setMessages
}) => {
  const [messageLoading, setMessageLoading] = useState(false)
  const socket = useSocket()

  socket?.on('messages', (data: Message[]) => {
    setMessages([...data])
    setLoading(false)
    setMessageLoading(false)
  })

  return (
    <Flex
      display={[
        `${activeUser ? 'flex' : 'none'}`,
        `${activeUser ? 'flex' : 'none'}`,
        'flex'
      ]}
      h="calc(100vh - 7.1em)"
      w="100%"
      direction="column"
    >
      <Top setActiveUser={setActiveUser} activeUser={activeUser} />

      {!loading && messages.length === 0 && (
        <Flex
          w="100%"
          h="100%"
          px={['0', '1em']}
          py="2em"
          alignItems="center"
          justifyContent="center"
          bg="#202737"
        >
          <Text color="gray.100" fontWeight="bold" fontSize="1.5em">
            Inicie uma conversa! 🤗
          </Text>
        </Flex>
      )}

      {loading && (
        <Flex
          w="100%"
          h="100%"
          px={['0', '1em']}
          py="2em"
          alignItems="center"
          justifyContent="center"
          bg="gray.700"
        >
          <Spinner color="purple" size="md" />
        </Flex>
      )}

      {!loading && messages.length > 0 && (
        <MessageList messageLoading={messageLoading} messages={messages} />
      )}

      <ChatBox activeUser={activeUser} setMessageLoading={setMessageLoading} />
    </Flex>
  )
}
export default Chat
