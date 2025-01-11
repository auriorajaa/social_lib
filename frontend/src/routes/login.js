import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Image
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/useAuth"
import { FiUser, FiLock } from "react-icons/fi"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { auth_login } = useAuth()
  const navigate = useNavigate()

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const brandColor = 'purple.500'

  const handleLogin = () => {
    auth_login(username, password)
  }

  const handleNav = () => {
    navigate('/register')
  }

  return (
    <Box>
      <Container maxW="5xl" py={{ base: 8, md: 20 }}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: 8, lg: 16 }} align="center">
          {/* Left Side - Branding */}
          <VStack flex="1" spacing={6} align={{ base: 'center', lg: 'start' }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heading
                size="2xl"
                bgGradient="linear(to-r, purple.400, purple.600)"
                bgClip="text"
                fontWeight="extrabold"
              >
                Social Lib
              </Heading>
            </MotionBox>
            <Text
              fontSize="xl"
              color={textColor}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              Share your thoughts with the world, connect with others, and stay updated with what matters to you.
            </Text>

            {/* Feature Points */}
            <Stack spacing={4} mt={4}>
              <Feature text="Share your moments with the community" />
              <Feature text="Follow interesting people and topics" />
              <Feature text="Discover trending conversations" />
            </Stack>
          </VStack>

          {/* Right Side - Login Form */}
          <Card
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            bg={cardBg}
            shadow="xl"
            rounded="xl"
            w={{ base: 'full', md: '400px' }}
            overflow="hidden"
          >
            <CardBody p={8}>
              <VStack spacing={6}>
                <Heading size="lg" textAlign="center">Welcome Back</Heading>

                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiUser} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      onChange={(e) => setUsername(e.target.value)}
                      _focus={{ borderColor: brandColor }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiLock} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      _focus={{ borderColor: brandColor }}
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  w="full"
                  size="lg"
                  colorScheme="purple"
                  onClick={handleLogin}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Sign In
                </Button>

                <Text
                  color={textColor}
                  onClick={handleNav}
                  cursor="pointer"
                  _hover={{ color: brandColor }}
                  transition="all 0.2s"
                >
                  Don't have an account? <Text as="span" color={brandColor} fontWeight="semibold">Sign up</Text>
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </Stack>
      </Container>
    </Box>
  )
}

// Feature component for the left side
const Feature = ({ text }) => (
  <Flex align="center" gap={3}>
    <Box
      as={motion.div}
      whileHover={{ scale: 1.1 }}
      h={2}
      w={2}
      rounded="full"
      bg="purple.500"
    />
    <Text color="gray.600">{text}</Text>
  </Flex>
)

export default Login