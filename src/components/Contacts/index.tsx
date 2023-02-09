import { useSession } from '@/hooks/useSession'
import { useSocket } from '@/hooks/useSocket'
import { Avatar, Flex, VStack, Text } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import Unreads from '../Unreads'

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

interface ContactsProps {
  activeUser: User | null
  setActiveUser: Dispatch<SetStateAction<User | null>>
  users: User[]
  setLoading: Dispatch<SetStateAction<boolean>>
  setMessages: Dispatch<SetStateAction<Message[]>>
}

const Contacts: React.FC<ContactsProps> = ({
  activeUser,
  setActiveUser,
  users,
  setLoading,
  setMessages
}) => {
  const socket = useSocket()
  const { session } = useSession()

  function handleClick(user: User) {
    socket?.emit('read', { currentUser: session?.email, otherUser: user.email })
    setLoading(true)
    setActiveUser(user)
    setMessages([])
  }

  return (
    <Flex
      w={['100%', '100%', '30%']}
      flexShrink={0}
      display={[
        `${activeUser ? 'none' : 'flex'}`,
        `${activeUser ? 'none' : 'flex'}`,
        'flex'
      ]}
      h="calc(100vh - 7.1em)"
      overflowY="auto"
      pl="2em"
      pr="1em"
      css={{
        '&::-webkit-scrollbar': {
          width: '0px'
        },
        '&::-webkit-scrollbar-track': {
          width: '0px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent'
        }
      }}
      borderRight={['2px solid']}
      borderColor="gray.700"
    >
      <Flex w="100%" direction="column">
        <Flex as="ul" direction="column">
          {users.map(user => (
            <Flex
              key={user.id}
              cursor="pointer"
              as="li"
              py="1em"
              w="100%"
              gap="1em"
              alignItems="center"
              borderBottom="1px solid"
              borderColor="gray.700"
              onClick={() => handleClick(user)}
            >
              <Avatar name={user.name} src={user.photoURL} size="md" />

              <VStack
                spacing="0.5em"
                w="fit-content"
                overflow="hidden"
                justifyContent="left"
                alignItems="left"
                lineHeight="1em"
              >
                <Text
                  as="strong"
                  fontSize="1em"
                  fontWeight="bold"
                  color="gray.300"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  w="fit-content"
                  textTransform="capitalize"
                >
                  {user.name}
                </Text>

                <Text
                  as="p"
                  fontSize="0.8em"
                  fontWeight="bold"
                  color="gray.600"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  w="fit-content"
                >
                  {user.email}
                </Text>
              </VStack>

              <Unreads email={user.email} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Contacts
