import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiUser, FiLock, FiMail } from "react-icons/fi"
import { motion } from "framer-motion"
import { register } from "../api/endpoints"

const MotionBox = motion(Box)

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const brandColor = 'purple.700'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async () => {
    if (formData.password === formData.confirmPassword) {
      try {
        await register(
          formData.email,
          formData.username,
          formData.firstName,
          formData.lastName,
          formData.password
        )
        alert('Success creating account. Please login with your credential')
        navigate('/login')
      } catch {
        alert('Something went wrong. Please try again...')
      }
    } else {
      alert('Passwords don\'t match')
    }
  }

  return (
    <Box>
      <Container maxW="5xl" py={{ base: 8, md: 5 }}>
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
                Join Social Lib
              </Heading>
            </MotionBox>
            <Text
              fontSize="xl"
              color={textColor}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              Create your account and start connecting with people from around the world.
            </Text>

            {/* Feature Points */}
            <Stack spacing={4} mt={4}>
              <Feature text="Create your unique profile" />
              <Feature text="Connect with like-minded people" />
              <Feature text="Share your stories and experiences" />
            </Stack>
          </VStack>

          {/* Right Side - Registration Form */}
          <Card
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            bg={cardBg}
            shadow="xl"
            rounded="xl"
            w={{ base: 'full', md: '500px' }}
            overflow="hidden"
          >
            <CardBody px={8}>
              <VStack spacing={5}>
                <Heading size="lg">Create Account</Heading>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiMail} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      _focus={{ borderColor: brandColor }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiUser} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="username"
                      type="text"
                      placeholder="Choose a username"
                      onChange={handleChange}
                      _focus={{ borderColor: brandColor }}
                    />
                  </InputGroup>
                </FormControl>

                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      name="firstName"
                      placeholder="First name"
                      onChange={handleChange}
                      _focus={{ borderColor: brandColor }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      name="lastName"
                      placeholder="Last name"
                      onChange={handleChange}
                      _focus={{ borderColor: brandColor }}
                    />
                  </FormControl>
                </Grid>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiLock} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      onChange={handleChange}
                      _focus={{ borderColor: brandColor }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiLock} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      onChange={handleChange}
                      _focus={{ borderColor: brandColor }}
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  w="full"
                  size="lg"
                  colorScheme="purple"
                  onClick={handleRegister}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Create Account
                </Button>

                <Text
                  color={textColor}
                  onClick={() => navigate('/login')}
                  cursor="pointer"
                  _hover={{ color: brandColor }}
                  transition="all 0.2s"
                >
                  Already have an account? <Text as="span" color={brandColor} fontWeight="semibold">Sign in</Text>
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

export default Register