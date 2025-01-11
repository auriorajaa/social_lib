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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { get_posts } from "../api/endpoints";
import Post from "../components/post";
import { FaNewspaper } from "react-icons/fa";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const fetchData = async () => {
    const data = await get_posts(nextPage);
    setPosts([...posts, ...data.results]);
    setNextPage(data.next ? nextPage + 1 : null);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch {
      alert("Something goes wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMorePosts = () => {
    if (nextPage) {
      fetchData();
    }
  };

  const LoadingSkeleton = () => (
    <Box borderWidth="1px" borderRadius="md" p={3} w="100%">
      <Skeleton height="20px" width="120px" mb={2} />
      <SkeletonText mt={4} noOfLines={2} spacing={4} />
      <Skeleton height="15px" width="60px" mt={4} />
    </Box>
  );

  return (
    <Container maxW="container.xl" py={8}>
      <Grid
        templateColumns={{
          base: "1fr",         // Stack everything on mobile (small screen)
          sm: "1fr",           // Stack everything on small tablets
          md: "1fr",           // Stack everything on tablet screens
          lg: "280px 1fr 290px", // For larger screens (like laptops)
        }}
        gap={8}
      >
        {/* Left Sidebar */}
        <Box display={{ base: "block", sm: "block", md: "block", lg: "block" }}>
          <Box
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            p={6}
            position="sticky"
            top="20px"
          >
            <VStack align="start" spacing={4}>
              <Flex align="center" gap={2}>
                <Icon as={FaNewspaper} color="purple.500" boxSize={5} />
                <Heading size="sm">Feed Statistics</Heading>
              </Flex>
              <Divider />
              <VStack align="start" spacing={3} width="100%">
                <Flex justify="space-between" width="100%">
                  <Text fontSize="sm" color="gray.600">Total Posts</Text>
                  <Badge colorScheme="purple">{posts.length}</Badge>
                </Flex>
                <Flex justify="space-between" width="100%">
                  <Text fontSize="sm" color="gray.600">Active Users</Text>
                  <Badge colorScheme="green">
                    {new Set(posts.map((post) => post.username)).size}
                  </Badge>
                </Flex>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  Showing {posts.length} of many posts. Load more to see more posts and statistics.
                </Text>
              </VStack>
            </VStack>
          </Box>
        </Box>

        {/* Main Content (Center Section) */}
        <VStack spacing={4} width="100%" align="start">
          <Heading size="lg" mb={4}>Recent Posts</Heading>

          {loading ? (
            <VStack spacing={4} width="100%">
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </VStack>
          ) : (
            <VStack spacing={4} width="100%">
              {posts.map((post) => (
                <Box key={post.id} width="100%">
                  <Post
                    id={post.id}
                    username={post.username}
                    description={post.description}
                    formatted_date={post.formatted_date}
                    liked={post.liked}
                    like_count={post.like_count}
                    width="100%"
                  />
                </Box>
              ))}
            </VStack>
          )}

          {nextPage && !loading && (
            <Button
              onClick={loadMorePosts}
              colorScheme="purple"
              variant="outline"
              size="lg"
              width="100%"
              mt={4}
              borderRadius="md"
              _hover={{
                transform: "translateY(-1px)",
                shadow: "sm",
              }}
            >
              Load More Posts
            </Button>
          )}
        </VStack>

        {/* Right Sidebar */}
        <Box
          display={{ base: "block", sm: "block", md: "block", lg: "block" }}
          width={{ base: "100%", sm: "100%", md: "100%", lg: "290px" }}
        >
          <Box
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            p={6}
            position="sticky"
            top="20px"
          >
            <VStack align="start" spacing={4}>
              <Heading size="sm">Fun Fact</Heading>
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
                    "Did you know? Bananas are berries, but strawberries aren't!"
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
                    "If you took all the veins in your body and laid them end to end, you’d die."
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Box>

      </Grid>
    </Container>
  );
};

export default Home;
