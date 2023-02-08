import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { theme } from '@/styles/theme'

import { BsGoogle } from 'react-icons/bs'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

import { signInWithPopup } from 'firebase/auth'

import { GetStaticProps } from 'next'
import { useFirebase } from '@/hooks/useFirebase'
import { api } from '@/services/api'
import { useSession } from '@/hooks/useSession'

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

interface Contact {
  id: string
  name: string
  email: string
  photoURL: string
}

interface HandleLoginParam {
  name: string
  email: string
  photoURL: string
  contacts: Contact[]
}

interface Response {
  user:
    | {
        name: string
        email: string
        photoURL: string
        contacts: Contact[]
      }
    | false
}

export default function Home(firebaseConfig: FirebaseConfig) {
  const { auth, provider } = useFirebase(firebaseConfig)
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [isSession, setIsSession] = useState(false)

  const { setSession, session } = useSession()

  // socket?.emit('message', 'teste')

  async function handleLogin(data: HandleLoginParam) {
    try {
      const response = await api.post<Response>('/user/account/login', {
        data
      })

      toast.success('Login realizado com sucesso!')

      if (response.data.user) {
        setSession({ ...response.data.user })
      } else {
        setSession(data)
      }

      router.push('/user/chat')
    } catch (error) {
      console.log(error)
    }
  }

  const handleFirebaseAuth = async () => {
    setLoading(true)

    try {
      const { user } = await signInWithPopup(auth, provider)
      const { displayName, email, photoURL } = user

      if (!(displayName && email)) {
        return toast.error('Ocorreu algum erro, tente novamente mais tarde!')
      }

      await handleLogin({
        name: displayName,
        email,
        photoURL: photoURL || displayName,
        contacts: []
      })

      setLoading(false)
    } catch (error: any) {
      console.log(error)

      toast.error('Ocorreu algum erro, tente novamente mais tarde!')

      setLoading(false)
    }
  }

  const blink = keyframes`
  0%{
    color: ${theme.colors.gray[800]}
  }
  70%{
    color: ${theme.colors.gray[800]}
  }
  100%{
    color: white
  }
  `

  useEffect(() => {
    if (session) {
      setIsSession(true)

      setTimeout(() => {
        router.push('/user/chat')
      }, 2000)
    }
  }, [session])

  return (
    <Flex as="main" w="100%" minH="100vh" bg="gray.800" p="2em">
      <Flex
        w="100%"
        maxW="1024px"
        mx="auto"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Heading>
          <Text as="span" color="gray.300">
            My
          </Text>
          <Text as="span" color="gray.100">
            Chat
          </Text>
          <Text as="span" animation={`${blink} 1s infinite`}>
            _
          </Text>
        </Heading>

        <Box mt="1em" w="100%" maxW="20em">
          {isSession ? (
            <Spinner color="red" size="md" mx="auto" display="flex" />
          ) : (
            <Button
              w="100%"
              borderRadius="full"
              colorScheme="red"
              onClick={handleFirebaseAuth}
              isLoading={isLoading}
            >
              <Icon as={BsGoogle} mr="0.5em" /> Continuar com o Google
            </Button>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps<FirebaseConfig> = async () => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY!,
    authDomain: process.env.FIREABSE_AUTH_DOMAIN!,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.FIREBASE_APP_ID!
  }

  return {
    props: firebaseConfig
  }
}
