import {
  Avatar,
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { BsArrowLeft } from 'react-icons/bs'

interface User {
  id: string
  name: string
  email: string
  photoURL: string
}

interface TopProps {
  setActiveUser: Dispatch<SetStateAction<User | null>>
  activeUser: User | null
}

const Top: React.FC<TopProps> = ({ setActiveUser, activeUser }) => (
  <Flex
    gap="1em"
    alignItems="center"
    w="100%"
    bg="gray.900"
    px="1em"
    py="0.5em"
  >
    <IconButton
      display={['flex', 'flex', 'none']}
      aria-label="Voltar"
      icon={<Icon as={BsArrowLeft} />}
      color="gray.100"
      colorScheme="gray.900"
      onClick={() => setActiveUser(null)}
    />

    <Avatar name={activeUser?.name} src={activeUser?.photoURL} size="md" />

    <VStack spacing="0" alignItems="left" overflow="hidden">
      <Text
        fontSize="1em"
        fontWeight="bold"
        color="gray.200"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
        textTransform="capitalize"
      >
        {activeUser?.name}
      </Text>

      <Text
        fontSize="0.8em"
        fontWeight="medium"
        color="gray.400"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {activeUser?.email}
      </Text>
    </VStack>
  </Flex>
)

export default Top
