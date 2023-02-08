import { useSession } from '@/hooks/useSession'
import { Avatar, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Options from '../Options'

const Header: React.FC = () => {
  const { session } = useSession()

  return (
    <Flex as="header" w="100%" py="1em" bg="gray.700" px="2em">
      <Flex maxW="1024px" mx="auto" w="100%">
        <Heading
          fontSize="1.5em"
          display="flex"
          justifyContent="center"
          cursor="default"
        >
          <Text as="span" color="gray.300">
            My
          </Text>

          <Text as="span" color="gray.100">
            Chat
          </Text>

          <Text as="span" color="gray.300">
            _
          </Text>
        </Heading>

        <Options />

        <Avatar
          name={session?.name}
          src={session?.photoURL}
          size="sm"
          ml="1em"
          border="0.15em solid"
          borderColor="gray.100"
        />
      </Flex>
    </Flex>
  )
}

export default Header
