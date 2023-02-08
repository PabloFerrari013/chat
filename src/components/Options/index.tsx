import { useSession } from '@/hooks/useSession'
import { Flex, HStack, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import AddUser from '../AddUser'

const Options: React.FC = () => {
  const { setSession } = useSession()

  return (
    <HStack spacing="0.5em" ml="auto">
      <AddUser />

      <IconButton
        fontSize="1.2em"
        color="gray.500"
        colorScheme="gray.700"
        size="sm"
        rounded="full"
        aria-label="Sair"
        title="Sair"
        icon={<FiLogOut />}
        onClick={() => setSession(null)}
      />
    </HStack>
  )
}

export default Options
