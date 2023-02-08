import { useSession } from '@/hooks/useSession'
import { api } from '@/services/api'
import { theme } from '@/styles/theme'
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import { toast } from 'react-toastify'

interface Contact {
  id: string
  name: string
  email: string
  photoURL: string
}

interface Response {
  contacts: Contact[]
}

const AddUser: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef<HTMLInputElement>(null)
  const finalRef = React.useRef(null)
  const { session, setSession } = useSession()
  const [isLoading, setLoading] = useState(false)

  const handleAddContact = async () => {
    setLoading(true)
    try {
      if (
        !initialRef.current?.value ||
        !session ||
        !initialRef.current?.value.trim()
      ) {
        return
      }

      const response = await api.post<Response>('/user/contacts/add', {
        email: session.email,
        newContact: initialRef.current.value
      })

      setSession({
        ...session,
        contacts: response.data.contacts
      })

      toast.success('Contato adicionado com sucesso!')

      setLoading(false)

      onClose()
    } catch (error: any) {
      console.log(error)

      setLoading(false)

      if (error.response.status === 404) {
        return toast.error('Usuário não encontrado!')
      }

      if (error.response.status === 403) {
        return toast.error('Usuário já adicionado ao sues contatos!')
      }

      toast.error('Conflito interno, tente novamente mais tarde!')
    }
  }

  return (
    <>
      <IconButton
        fontSize="1.2em"
        color="gray.500"
        colorScheme="gray.700"
        size="sm"
        rounded="full"
        aria-label="Adicionar contato"
        title="Adicionar contato"
        icon={<BsPlusCircleFill />}
        onClick={onOpen}
      />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent bg="gray.800">
          <ModalHeader color="gray.200">Adicionar Usuário</ModalHeader>

          <ModalCloseButton color="gray.600" />

          <ModalBody>
            <FormControl>
              <FormLabel fontWeight="medium" color="gray.300">
                E-mail:
              </FormLabel>

              <Input
                ref={initialRef}
                placeholder="example@gmail.com"
                border="2px solid"
                borderColor="purple.800"
                color="gray.100"
                fontWeight="medium"
                type="email"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={handleAddContact}
              isLoading={isLoading}
            >
              Adicionar
            </Button>

            <Button onClick={onClose} colorScheme="pink">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddUser
