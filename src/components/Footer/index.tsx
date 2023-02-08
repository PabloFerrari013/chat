import { Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <Flex
      as="footer"
      w="100%"
      py="1em"
      px="2em"
      justifyContent="center"
      bg="gray.700"
    >
      <Text fontSize="0.7em" fontWeight="bold" color="gray.300">
        Created by Pablo Ferrari - 2023
      </Text>
    </Flex>
  )
}

export default Footer
