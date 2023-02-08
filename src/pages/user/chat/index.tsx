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

export default function Chat() {
  const { session } = useSession()
  const [activeUser, setActiveUser] = useState<User | null>(null)
  const socket = useSocket()

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
        <Flex maxW="1024px" w="100%" mx="auto">
          {session ? (
            <>
              <Contacts
                activeUser={activeUser}
                setActiveUser={setActiveUser}
                users={session.contacts}
              />

              {activeUser ? (
                <C activeUser={activeUser} setActiveUser={setActiveUser} />
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
