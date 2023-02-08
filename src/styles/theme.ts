import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontFamily: `'Poppins', sans-serif`
      }
    })
  },
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff'
  }
})
