import { Button, Flex, VStack, FormControl, FormLabel, Input, Heading, Text } from "@chakra-ui/react"
import { register } from "../api/endpoints"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = async () => {
    if (password === confirmPassword) {
      try {
        await register(email, username, firstName, lastName, password)
        alert('Success creating account. Please login with your credential')
        navigate('/login')
      } catch {
        alert('Something goes wrong. Please try again...')
      }
    } else {
      alert('Password didn\'t match')
    }
  }

  const handleNav = () => {
    navigate('/login')
  }

  return (
    <Flex w='100%' h='calc(100vh - 100px)' justifyContent='center' alignItems='center'>
      <VStack alignItems='start' w='95%' maxW='400px' gap='20px'>
        <Heading>Create Account</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} bg='white' type='email' />
        </FormControl>

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input onChange={(e) => setUsername(e.target.value)} bg='white' type='text' />
        </FormControl>

        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input onChange={(e) => setFirstName(e.target.value)} bg='white' type='text' />
        </FormControl>

        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input onChange={(e) => setLastName(e.target.value)} bg='white' type='text' />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input onChange={(e) => setPassword(e.target.value)} bg='white' type='password' />
        </FormControl>

        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input onChange={(e) => setConfirmPassword(e.target.value)} bg='white' type='password' />
        </FormControl>

        <VStack w='100%' alignItems='start' gap='12px'>
          <Button onClick={handleRegister} w='100%' colorScheme='purple' fontSize='18px'>Create Account</Button>
          <Text
            onClick={handleNav}
            fontSize='14px'
            color='gray.500'
            style={{ cursor: 'pointer' }}
          >
            Already have an account? Login
          </Text>
        </VStack>
      </VStack>
    </Flex>
  )
}

export default Register