import Contacts from '@/components/Contacts'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useSession } from '@/hooks/useSession'
import C from '@/components/Chat'
import { Flex, Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import Preview from '@/components/Preview'
import { useSocket } from '@/hooks/useSocket'

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

export default function Chat() {
  const { session } = useSession()
  const [activeUser, setActiveUser] = useState<User | null>(null)
  const socket = useSocket()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])

  socket?.on('check', (user: string) => {
    if (activeUser?.email === user) {
      socket?.emit('check', {
        currentUser: session?.email,
        otherUser: activeUser?.email
      })
    }
  })

  return (
    <>
      <Header />

      <Flex as="main" bg="gray.800">
        <Flex maxW="1024px" w="100%" mx="auto" px={['0', '0', '2em', '0']}>
          {session ? (
            <>
              <Contacts
                activeUser={activeUser}
                setActiveUser={setActiveUser}
                users={session.contacts}
                setLoading={setLoading}
                setMessages={setMessages}
              />

              {activeUser ? (
                <C
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                  loading={loading}
                  setLoading={setLoading}
                  messages={messages}
                  setMessages={setMessages}
                />
              ) : (
                <Preview />
              )}
            </>
          ) : (
            <Flex
              w="100%"
              h="calc(100vh - 7.1em)"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner color="purple" size="lg" />
            </Flex>
          )}
        </Flex>
      </Flex>

      <Footer />
    </>
  )
}
