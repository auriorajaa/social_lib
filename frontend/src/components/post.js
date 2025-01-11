import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Flex
} from "@chakra-ui/react"
import { useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { toggleLike } from "../api/endpoints"

const Post = ({ id, username, description, formatted_date, liked, like_count }) => {

  const [clientLiked, setClientLiked] = useState(liked)
  const [clientLikedCount, setClientLikedCount] = useState(like_count)

  const handleToggleLike = async () => {
    const data = await toggleLike(id)

    if (data.now_liked) {
      setClientLiked(true)
      setClientLikedCount(clientLiked + 1)
    } else {
      setClientLiked(false)
      setClientLikedCount(clientLiked - 1)
    }
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={3}
      w="100%"
      bg="white"
      _hover={{ bg: "gray.50" }}
      transition="background 0.2s"
    >
      <VStack align="stretch" spacing={4}>
        {/* Header: Username and Date */}
        <HStack justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="lg">@{username}</Text>
          <Text color="gray.500" fontSize="xs">{formatted_date}</Text>
        </HStack>

        {/* Post Description */}
        <Text
          fontSize="sm"
          lineHeight="short"
        >
          {description}
        </Text>

        {/* Like Section */}
        <Flex align="center" gap={1}>
          <Icon
          onClick={handleToggleLike}
            as={clientLiked ? FaHeart : FaRegHeart}
            color={clientLiked ? "red.500" : "gray.500"}
            cursor="pointer"
            w={3.5}
            h={3.5}
          />
          <Text color="gray.500" fontSize="xs">
            {clientLikedCount}
          </Text>
        </Flex>
      </VStack>
    </Box>
  )
}

export default Post