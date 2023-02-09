import { useSession } from '@/hooks/useSession'
import { useSocket } from '@/hooks/useSocket'
import { Flex, IconButton, Input, Textarea } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { BiImage } from 'react-icons/bi'
import { IoMdSend } from 'react-icons/io'
import ButtonFile from '../ButtonFile'

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
    <Flex gap="0.5em" alignItems="center" py="0.5em" px={['1em', '1em', '0']}>
      <ButtonFile />

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
        bg="gray.700"
        h="100%"
        px="0.5em"
        rounded="md"
        alignItems="center"
        justifyContent="center"
        aria-label="Send"
        icon={<IoMdSend />}
        fontSize="2em"
        size="sm"
        color="gray.100"
        onClick={() => handleSubmitMessage()}
        _hover={{ bg: 'gray.700' }}
      />
    </Flex>
  )
}

export default ChatBox
