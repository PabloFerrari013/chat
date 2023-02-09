import { useSession } from '@/hooks/useSession'
import { storage } from '@/services/firebase'
import { Flex, IconButton, Input } from '@chakra-ui/react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BiImage } from 'react-icons/bi'

const ButtonFile: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { session } = useSession()
  const [imgURL, setImgURL] = useState('')
  const [progress, setProgress] = useState(0)

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]

    if (!file) return

    const storageRef = ref(storage, `${session?.email}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      snapshort => {
        let progress = (snapshort.bytesTransferred / snapshort.totalBytes) * 100

        setProgress(progress)
      },
      error => {
        alert(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setImgURL(url)
        })
      }
    )
  }

  return (
    <Flex
      position="relative"
      bg="gray.700"
      h="100%"
      px="1em"
      rounded="md"
      alignItems="center"
      justifyContent="center"
      onClick={() => inputRef.current?.click()}
      cursor="pointer"
    >
      <IconButton
        position="relative"
        colorScheme="transparent"
        aria-label="Send"
        icon={<BiImage />}
        rounded="md"
        fontSize="2em"
        size="sm"
      />

      <Input
        ref={inputRef}
        type="file"
        position="absolute"
        zIndex="-1"
        onChange={handleFile}
        accept={'image/jpeg, image/png, image/jpg'}
        multiple={false}
      />
    </Flex>
  )
}

export default ButtonFile
