import {
  Box,
  Button,
  Container,
  Textarea,
  Text,
  useColorModeValue,
  Circle,
  Flex
} from "@chakra-ui/react"
import { useState } from "react"
import { FaPen } from "react-icons/fa"
import { create_post } from "../api/endpoints"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const handlePost = async () => {
    try {
      await create_post(description)
      navigate('/')
    } catch {
      alert('Failed to create post. Please try again')
    }
  }

  return (
    <Container maxW="container.sm" py={8}>
      <Box
        bg={bgColor}
        borderRadius="xl"
        boxShadow="sm"
        overflow="hidden"
        borderWidth="1px"
        borderColor={borderColor}
      >
        {/* Header */}
        <Flex
          px={6}
          py={4}
          borderBottomWidth="1px"
          borderColor={borderColor}
          align="center"
          gap={3}
        >
          <Circle size={8} bg="purple.500" color="white">
            <FaPen size={12} />
          </Circle>
          <Text fontWeight="medium" fontSize="lg">
            Create a new post
          </Text>
        </Flex>

        {/* Content */}
        <Box p={6}>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's on your mind?"
            size="lg"
            rows={6}
            resize="none"
            border="none"
            p={0}
            _focus={{
              border: "none",
              boxShadow: "none"
            }}
            fontSize="md"
          />
        </Box>

        {/* Footer */}
        <Flex
          px={6}
          py={4}
          borderTopWidth="1px"
          borderColor={borderColor}
          justify="flex-end"
        >
          <Button
            onClick={handlePost}
            colorScheme="purple"
            size="md"
            px={8}
            fontWeight="medium"
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "sm"
            }}
            transition="all 0.2s"
          >
            Post
          </Button>
        </Flex>
      </Box>
    </Container>
  )
}

export default CreatePost