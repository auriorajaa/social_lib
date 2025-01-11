import {
  Box,
  Button,
  Container,
  Textarea,
  Text,
  useColorModeValue,
  Circle,
  Flex,
  Icon,
  VStack,
  useToast,
  Progress
} from "@chakra-ui/react"
import { useState } from "react"
import { FaPen } from "react-icons/fa"
import { MdWavingHand } from "react-icons/md"
import { create_post } from "../api/endpoints"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const ornamentColor = useColorModeValue("purple.50", "purple.900")
  const secondaryText = useColorModeValue("gray.600", "gray.400")

  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const characterLimit = 400
  const characterCount = description.length
  const progress = (characterCount / characterLimit) * 100

  const handlePost = async () => {
    if (!description.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before posting",
        status: "warning",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    try {
      await create_post(description)
      toast({
        title: "Post created!",
        description: "Your post has been published successfully",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
      navigate('/')
    } catch {
      toast({
        title: "Failed to create post",
        description: "Please try again later",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.md" py={8}>
      {/* Welcome Message */}
      <Flex align="center" mb={6} gap={2}>
        <Icon as={MdWavingHand} boxSize={6} color="purple.500" />
        <Text fontSize="xl" fontWeight="medium">
          Share your thoughts
        </Text>
      </Flex>

      <Box
        bg={bgColor}
        borderRadius="xl"
        overflow="hidden"
        borderWidth="1px"
        position="relative"
      >
        {/* Header */}
        <Flex
          px={6}
          py={4}
          borderBottomWidth="1px"
          borderColor={borderColor}
          align="center"
          gap={3}
          position="relative"
        >
          <Circle size={10} bg="purple.500" color="white">
            <FaPen size={14} />
          </Circle>
          <Text fontWeight="medium" fontSize="lg">
            Create a new post
          </Text>
        </Flex>

        {/* Content */}
        <Box p={6} position="relative">
          <Textarea
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= characterLimit) {
                setDescription(e.target.value)
              }
            }}
            placeholder="What's on your mind? Share your thoughts, ideas, or stories..."
            size="lg"
            rows={8}
            resize="none"
            border="none"
            p={0}
            _focus={{
              border: "none",
              boxShadow: "none"
            }}
            fontSize="md"
          />

          {/* Character Count */}
          <Text
            position="absolute"
            bottom={2}
            right={6}
            fontSize="sm"
            color={characterCount >= characterLimit ? "red.500" : secondaryText}
          >
            {characterCount}/{characterLimit}
          </Text>
        </Box>

        {/* Progress Bar */}
        <Progress
          value={progress}
          size="xs"
          colorScheme={progress > 90 ? "red" : "purple"}
          backgroundColor={borderColor}
        />

        {/* Footer */}
        <Flex
          px={6}
          py={4}
          borderTopWidth="1px"
          borderColor={borderColor}
          justify="space-between"
          align="center"
          position="relative"
        >
          <Button
            onClick={handlePost}
            colorScheme="purple"
            size="md"
            px={8}
            fontWeight="medium"
            isLoading={isLoading}
            loadingText="Posting..."
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "lg"
            }}
            transition="all 0.2s"
          >
            Post
          </Button>
        </Flex>
      </Box>

      {/* Tips Section */}
      <VStack
        mt={6}
        p={4}
        bg={ornamentColor}
        borderRadius="lg"
        align="flex-start"
        spacing={2}
      >
        <Text fontWeight="medium" color="purple.500">
          Tips for great posts:
        </Text>
        <Text fontSize="sm" color={secondaryText}>
          • Be clear and concise
        </Text>
        <Text fontSize="sm" color={secondaryText}>
          • Share authentic experiences
        </Text>
        <Text fontSize="sm" color={secondaryText}>
          • Engage with your audience
        </Text>
      </VStack>
    </Container>
  )
}

const HStack = ({ children, ...props }) => (
  <Flex {...props}>
    {children}
  </Flex>
)

export default CreatePost