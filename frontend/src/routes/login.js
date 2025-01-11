import { Button, Flex, VStack, FormControl, FormLabel, Input, Heading, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/useAuth"

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { auth_login } = useAuth()

  const navigate = useNavigate()

  const handleLogin = () => {
    auth_login(username, password)
  }

  const handleNav = () => {
    navigate('/register')
  }

  return (
    <Flex w='100%' h='calc(100vh - 180px)' justifyContent='center' alignItems='center'>
      <VStack alignItems='start' w='95%' maxW='400px' gap='34px'>
        <Heading>Login</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input onChange={(e) => setUsername(e.target.value)} bg='white' type='text' />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input onChange={(e) => setPassword(e.target.value)} bg='white' type='password' />
        </FormControl>

        <VStack w='100%' alignItems='start' gap='12px'>
          <Button onClick={handleLogin} w='100%' colorScheme='purple' fontSize='18px'>Login</Button>
          <Text
            onClick={handleNav}
            fontSize='14px'
            color='gray.500'
            style={{ cursor: 'pointer' }}
          >
            Dont't have an account? Create account
          </Text>
        </VStack>
      </VStack>
    </Flex>
  )
}

export default Login