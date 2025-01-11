import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Skeleton,
  SkeletonText,
  Icon,
  VStack,
  Divider,
  Badge,
  Textarea,
  Progress,
  Circle,
  useToast,
} from "@chakra-ui/react";
import {
  FaChartLine,
  FaPen,
  FaUsers,
  FaHashtag,
  FaRegLightbulb,
} from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { get_posts, create_post } from "../api/endpoints";
import Post from "../components/post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [description, setDescription] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const secondaryText = useColorModeValue("gray.600", "gray.400");

  const characterLimit = 400;
  const characterCount = description.length;
  const progress = (characterCount / characterLimit) * 100;

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await get_posts(nextPage);
      setPosts([...posts, ...data.results]);
      setNextPage(data.next ? nextPage + 1 : null);
    } catch (error) {
      toast({
        title: "Error fetching posts",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!description.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before posting",
        status: "warning",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsPosting(true);
    try {
      const response = await create_post(description);
      setPosts([response, ...posts]);
      setDescription("");
      toast({
        title: "Post created!",
        description: "Your post has been published successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to create post",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsPosting(false);
    }
  };

  const LoadingSkeleton = () => (
    <Box borderWidth="1px" borderRadius="md" p={3} w="100%">
      <Skeleton height="20px" width="120px" mb={2} />
      <SkeletonText mt={4} noOfLines={2} spacing={4} />
      <Skeleton height="15px" width="60px" mt={4} />
    </Box>
  );


  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 150); // Show button after scrolling 200px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "280px 1fr 290px",
        }}
        gap={8}
      >
        {/* Left Sidebar */}
        <Box display={{ base: "none", lg: "block" }}>
          <VStack spacing={4}>
            <Box
              bg={bgColor}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              py={6}
              px={9}
            >
              <VStack spacing={4}>
                <Flex align="center" gap={2}>
                  <Icon as={FaChartLine} color="purple.500" boxSize={5} />
                  <Heading size="sm">Analytics</Heading>
                </Flex>
                <Divider />
                <VStack align="start" width="100%" spacing={3}>
                  <Flex justify="space-between" width="100%">
                    <Text fontSize="sm">Total Posts</Text>
                    <Badge colorScheme="purple">{posts.length}</Badge>
                  </Flex>
                  <Flex justify="space-between" width="100%">
                    <Text fontSize="sm">Today's Posts</Text>
                    <Badge colorScheme="blue">
                      {posts.filter(post =>
                        new Date(post.formatted_date).toDateString() === new Date().toDateString()
                      ).length}
                    </Badge>
                  </Flex>
                  <Flex justify="space-between" width="100%">
                    <Text fontSize="sm">Active Users</Text>
                    <Badge colorScheme="green">
                      {new Set(posts.map(post => post.username)).size}
                    </Badge>
                  </Flex>
                  <Flex justify="space-between" width="100%">
                    <Text fontSize="sm">Engagement Rate</Text>
                    <Badge colorScheme="blue">
                      {posts.length > 0 ?
                        `${((posts.reduce((acc, post) => acc + post.like_count, 0) / posts.length).toFixed(1))} likes/post`
                        : '0 likes/post'}
                    </Badge>
                  </Flex>
                  <Flex justify="space-between" width="100%">
                    <Text fontSize="sm">Most Active Time</Text>
                    <Badge colorScheme="orange">2PM - 6PM</Badge>
                  </Flex>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    Showing {posts.length} of many posts. Load more to see more posts and statistics.
                  </Text>
                </VStack>
              </VStack>
            </Box>

            <Box
              bg={bgColor}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              p={6}
            >
              <VStack spacing={4}>
                <Flex align="center" gap={2}>
                  <Icon as={FaRegLightbulb} color="purple.500" boxSize={5} />
                  <Heading size="sm">About Social Lib</Heading>
                </Flex>
                <Divider />
                <VStack align="start" spacing={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    A minimalist social platform focused on sharing thoughts and ideas.
                  </Text>
                  <Flex align="center" gap={2}>
                    <Icon as={FaUsers} color="purple.500" />
                    <Text fontSize="sm">Connect with like-minded people</Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <Icon as={FaHashtag} color="purple.500" />
                    <Text fontSize="sm">Share your unique perspective</Text>
                  </Flex>
                </VStack>
              </VStack>
            </Box>
          </VStack>
        </Box>

        {/* Main Content */}
        <VStack spacing={4} width="100%" align="stretch">
          <Box
            bg={bgColor}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
          >
            <Flex
              px={6}
              py={4}
              borderBottomWidth="1px"
              borderColor={borderColor}
              align="center"
              gap={3}
            >
              <Circle size={10} bg="purple.500" color="white">
                <FaPen size={14} />
              </Circle>
              <Text fontWeight="medium" fontSize="lg">
                Create a new post
              </Text>
            </Flex>

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
                rows={4}
                resize="none"
                border="none"
                _focus={{
                  border: "none",
                  boxShadow: "none"
                }}
              />
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

            <Progress
              value={progress}
              size="xs"
              colorScheme={progress > 90 ? "red" : "purple"}
              backgroundColor={borderColor}
            />

            <Flex
              px={6}
              py={4}
              borderTopWidth="1px"
              borderColor={borderColor}
              justify="space-between"
              align="center"
            >
              <Button
                onClick={handleCreatePost}
                colorScheme="purple"
                size="md"
                px={8}
                fontWeight="medium"
                isLoading={isPosting}
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

          <VStack spacing={4} width="100%">
            {loading ? (
              Array(3).fill(null).map((_, i) => <LoadingSkeleton key={i} />)
            ) : (
              posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  username={post.username}
                  description={post.description}
                  formatted_date={post.formatted_date}
                  liked={post.liked}
                  like_count={post.like_count}
                />
              ))
            )}
          </VStack>

          {nextPage && !loading && (
            <Button
              onClick={fetchData}
              colorScheme="purple"
              variant="outline"
              size="lg"
              width="100%"
              mt={4}
            >
              Load More Posts
            </Button>
          )}
        </VStack>

        {/* Right Sidebar */}
        <Box display={{ base: "none", lg: "block" }}>
          <VStack spacing={4}>
            <Box
              bg={bgColor}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              p={6}
            >
              <VStack align="start" spacing={4}>
                <Heading size="sm">Fun Facts</Heading>
                <Box>
                  <Box
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    mb={4}
                    bg={useColorModeValue("gray.50", "gray.700")}
                  >
                    <Text fontSize="sm" color="gray.600">
                      "The average person spends six months of their lifetime waiting for red lights to turn green."
                    </Text>
                  </Box>
                  <Box
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    mb={4}
                    bg={useColorModeValue("gray.50", "gray.700")}
                  >
                    <Text fontSize="sm" color="gray.600">
                      "Bananas are berries, but strawberries aren't!"
                    </Text>
                  </Box>
                  <Box
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    bg={useColorModeValue("gray.50", "gray.700")}
                  >
                    <Text fontSize="sm" color="gray.600">
                      "If you took all the veins in your body and laid them end to end, you'd die."
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </Box>

            <Box
              bg={bgColor}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              p={6}
            >
              <VStack align="start" spacing={4}>
                <Heading size="sm">Did You Know?</Heading>
                <VStack align="start" spacing={3}>
                  <Text fontSize="sm" color={secondaryText}>
                    Social Lib was created with simplicity in mind. No direct messages, no image uploads - just pure thoughts and interactions.
                  </Text>
                  <Text fontSize="sm" color={secondaryText}>
                    Our platform uses advanced algorithms to ensure content quality and engagement.
                  </Text>
                  <Text fontSize="sm" color={secondaryText}>
                    Join thousands of users sharing their ideas daily!
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Grid>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <Box position="fixed" bottom="50px" right="50px" zIndex="1000">
          <Button
            colorScheme="purple"
            onClick={scrollToTop}
            borderRadius="full"
            p={5}
            size={'22px'}
            boxShadow="lg"
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "xl",
            }}
            transition="all 0.3s"
          >
            <Icon as={FaArrowUp} boxSize={5} />
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home;