import { useSession } from '@/hooks/useSession'
import { Box, Flex, Icon, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { BsCheckAll } from 'react-icons/bs'

interface Message {
  data: {
    to: string
    from: string
    id: string
    message: string
    timestamp: string
    visualized: boolean
  }
}

interface MessageListProps {
  messageLoading: boolean
  messages: Message[]
}

const MessageList: React.FC<MessageListProps> = ({
  messageLoading,
  messages
}) => {
  const { session } = useSession()
  const chatRef = useRef<HTMLDivElement>(null)

  function handleScrollChat() {
    if (chatRef?.current) {
      if (chatRef.current.scrollHeight > chatRef.current.offsetHeight) {
        chatRef.current.scrollTop =
          chatRef.current.scrollHeight - chatRef.current.offsetHeight
      }
    }
  }

  useEffect(() => {
    handleScrollChat()
  }, [messages])

  return (
    <Box
      ref={chatRef}
      w="100%"
      overflowY="auto"
      h="100%"
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
      px="1em"
      py="2em"
      bg="#202737"
    >
      <Flex direction="column" gap="0.5em">
        {messages.map(msg => (
          <Box key={msg.data.id}>
            {msg.data.from === session?.email ? (
              <Box
                bg="pink.600"
                p="1em"
                rounded="md"
                borderTopRightRadius="0"
                h="min-content"
                w="fit-content"
                maxW="60%"
                ml="auto"
              >
                <Text fontSize="1em" fontWeight="medium" lineHeight="1.3em">
                  {msg.data.message}
                </Text>

                <Flex mt="1em" alignItems="center" gap="1em">
                  <Text as="time" fontSize="0.8em" fontWeight="medium">
                    <Text as="span">
                      {new Date(msg.data.timestamp).toLocaleDateString(
                        'pt-BR',
                        {
                          day: 'numeric',
                          month: '2-digit',
                          year: 'numeric'
                        }
                      )}
                    </Text>
                    -
                    {new Date(msg.data.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>

                  <Icon
                    as={BsCheckAll}
                    ml="auto"
                    fontSize="1.2em"
                    color={msg.data.visualized ? 'gray.800' : 'gray.200'}
                  />
                </Flex>
              </Box>
            ) : (
              <Box
                bg="purple.500"
                p="1em"
                rounded="md"
                borderTopLeftRadius="0"
                h="min-content"
                w="fit-content"
                maxW="60%"
              >
                <Text fontSize="1em" fontWeight="medium" lineHeight="1.3em">
                  {msg.data.message}
                </Text>

                <Flex mt="1em" alignItems="center" gap="1em">
                  <Text as="time" fontSize="0.8em" fontWeight="medium">
                    <Text as="span">
                      {new Date(msg.data.timestamp).toLocaleDateString(
                        'pt-BR',
                        {
                          day: 'numeric',
                          month: '2-digit',
                          year: 'numeric'
                        }
                      )}
                    </Text>
                    -
                    {new Date(msg.data.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>

                  <Icon
                    as={BsCheckAll}
                    ml="auto"
                    fontSize="1.2em"
                    color={msg.data.visualized ? 'gray.800' : 'gray.200'}
                  />
                </Flex>
              </Box>
            )}
          </Box>
        ))}
      </Flex>

      {messageLoading && (
        <Spinner size="md" color="purple" mx="auto" display="flex" mt="2em" />
      )}
    </Box>
  )
}

export default MessageList
