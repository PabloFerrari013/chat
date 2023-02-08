import { useSession } from '@/hooks/useSession'
import { useSocket } from '@/hooks/useSocket'
import { Flex, IconButton, Textarea } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { IoMdSend } from 'react-icons/io'

interface User {
  id: string
  name: string
  email: string
  photoURL: string
}

interface ChatBoxProps {
  activeUser: User | null
  setMessageLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatBox: React.FC<ChatBoxProps> = ({ activeUser, setMessageLoading }) => {
  const socket = useSocket()
  const { session } = useSession()
  const [message, setMessage] = useState('')

  function handleSubmitMessage() {
    socket?.emit('message', {
      message,
      from: session?.email,
      to: activeUser?.email,
      timestamp: new Date()
    })

    setMessage('')
    setMessageLoading(true)
  }

  return (
    <Flex gap="0.5em" alignItems="center" py="1em" px="1em">
      <Textarea
        placeholder="Digite sua mensagem"
        w="100%"
        resize="none"
        rows={2}
        fontSize="1em"
        fontWeight="medium"
        border="none"
        rounded="md"
        bg="gray.700"
        px="2em"
        color="gray.200"
        onChange={v => setMessage(v.target.value)}
        value={message}
      />

      <IconButton
        colorScheme="transparent"
        aria-label="Send"
        icon={<IoMdSend />}
        rounded="md"
        fontSize="2em"
        size="sm"
        onClick={() => handleSubmitMessage()}
      />
    </Flex>
  )
}

export default ChatBox
