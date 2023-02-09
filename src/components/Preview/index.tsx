import { useSession } from '@/hooks/useSession'
import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Preview: React.FC = () => {
  const { session } = useSession()
  const [name, setName] = useState('')

  useEffect(() => {
    if (session) setName(session.name?.split(' ')[0])
  }, [session])

  return (
    <Flex
      h="calc(100vh - 7.1em)"
      display={['none', 'none', 'flex']}
      direction="column"
      w="100%"
      alignItems="center"
      justifyContent="center"
      background="radial-gradient(circle, #202733 0%, rgba(26,32,44,1) 85%);"
      px="2em"
      textAlign="center"
      borderLeft={['2px solid']}
      borderColor="gray.700"
    >
      <Text color="gray.100" fontWeight="bold" fontSize="2em">
        Inicie uma conversa, {` `}
        <Text as="span" textTransform="capitalize">
          {name}
        </Text>
        ! 🤗
      </Text>
    </Flex>
  )
}

export default Preview
