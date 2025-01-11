import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  Button,
  Grid,
  useColorModeValue,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Icon,
  useBreakpointValue
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { get_user_profile_data, get_users_posts, toggleFollow } from "../api/endpoints"
import { SERVER_URL } from "../constants/constants"
import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5"
import { FaRegEdit, FaUsers, FaUserFriends } from "react-icons/fa"
import Post from "../components/post"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {
  const get_username_from_url = () => {
    const url_split = window.location.pathname.split('/')
    return url_split[url_split.length - 1]
  }

  const [username, setUsername] = useState(get_username_from_url())

  useEffect(() => {
    setUsername(get_username_from_url())
  }, [])

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} width="100%">
        <UserDetails username={username} />
        <UserPosts username={username} />
      </VStack>
    </Container>
  )
}

const UserDetails = ({ username }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [bio, setBio] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [isOurProfile, setIsOurProfile] = useState(false)
  const [following, setFollowing] = useState(false)

  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const imageSize = useBreakpointValue({ base: "120px", md: "160px" })

  const handleToggleFollow = async () => {
    const data = await toggleFollow(username)
    if (data.now_following) {
      setFollowerCount(followerCount + 1)
      setFollowing(true)
    } else {
      setFollowerCount(followerCount - 1)
      setFollowing(false)
    }
  }

  const handleEditProfile = () => {
    navigate('/settings')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_user_profile_data(username)
        setBio(data.bio)
        setProfileImage(data.profile_image)
        setFollowerCount(data.follower_count)
        setFollowingCount(data.following_count)
        setIsOurProfile(data.is_our_profile)
        setFollowing(data.following)
      } catch {
        console.log('Something goes wrong!')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <Box
      w="100%"
      bg={bgColor}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      p={{ base: 4, md: 6 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 6, md: 8 }}
        align={{ base: "center", md: "start" }}
      >
        {/* Profile Image */}
        {loading ? (
          <SkeletonCircle size={imageSize} />
        ) : (
          <Box
            boxSize={imageSize}
            borderWidth="3px"
            borderColor="purple.500"
            borderRadius="full"
            overflow="hidden"
            flexShrink={0}
          >
            <Image
              src={`${SERVER_URL}${profileImage}`}
              boxSize="100%"
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/150"
            />
          </Box>
        )}

        {/* User Info */}
        <VStack
          align={{ base: "center", md: "start" }}
          spacing={4}
          flex={1}
          w="100%"
        >
          <Heading size="lg">@{username}</Heading>

          {/* Stats */}
          <HStack
            spacing={{ base: 8, md: 12 }}
            justify={{ base: "center", md: "start" }}
            w="100%"
          >
            <VStack spacing={1}>
              <HStack>
                <Icon as={FaUsers} color="purple.500" />
                <Text fontWeight="medium">Followers</Text>
              </HStack>
              <Text fontSize="lg" fontWeight="bold">
                {loading ? <Skeleton w="40px" h="24px" /> : followerCount}
              </Text>
            </VStack>

            <VStack spacing={1}>
              <HStack>
                <Icon as={FaUserFriends} color="purple.500" />
                <Text fontWeight="medium">Following</Text>
              </HStack>
              <Text fontSize="lg" fontWeight="bold">
                {loading ? <Skeleton w="40px" h="24px" /> : followingCount}
              </Text>
            </VStack>
          </HStack>

          {/* Bio */}
          <Text
            color="gray.600"
            textAlign={{ base: "center", md: "left" }}
            w="100%"
          >
            {loading ? <SkeletonText noOfLines={2} /> : bio}
          </Text>

          {/* Action Button */}
          {!loading && (
            <Button
              leftIcon={
                isOurProfile ?
                  <FaRegEdit size="16px" /> :
                  following ?
                    <IoPersonRemoveOutline size="16px" /> :
                    <IoPersonAddOutline size="16px" />
              }
              onClick={isOurProfile ? handleEditProfile : handleToggleFollow}
              colorScheme={isOurProfile ? "gray" : "purple"}
              size="md"
              fontSize='md'
              width={{ base: "100%", md: "auto" }}
              _hover={{
                transform: "translateY(-1px)",
                shadow: "md"
              }}
              transition="all 0.2s"
            >
              {isOurProfile ? 'Edit Profile' : following ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </VStack>
      </Flex>
    </Box>
  )
}

const UserPosts = ({ username }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await get_users_posts(username)
        setPosts(posts)
      } catch {
        alert('Error getting user posts')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const LoadingSkeleton = () => (
    <Box borderWidth="1px" borderRadius="md" p={3}>
      <Skeleton height="20px" width="120px" mb={2} />
      <SkeletonText mt={4} noOfLines={2} spacing={4} />
      <Skeleton height="15px" width="60px" mt={4} />
    </Box>
  )

  return (
    <VStack width="100%" spacing={6}>
      <Heading size="md" alignSelf="start">Posts</Heading>

      {loading ? (
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={4}
          width="100%"
        >
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </Grid>
      ) : posts.length === 0 ? (
        <Text color="gray.500" fontSize="lg" py={8}>
          No posts yet
        </Text>
      ) : (
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={4}
          width="100%"
        >
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              description={post.description}
              formatted_date={post.formatted_date}
              liked={post.liked}
              like_count={post.like_count}
            />
          ))}
        </Grid>
      )}
    </VStack>
  )
}

export default UserProfile