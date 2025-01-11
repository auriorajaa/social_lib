import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  VStack,
  Image,
  Text,
  IconButton,
  Skeleton,
  Container,
  useBreakpointValue,
  useColorModeValue,
  Icon,
  Badge,
  InputGroup,
  InputLeftElement,
  useToast,
  Circle
} from "@chakra-ui/react";
import { useState } from "react";
import { search_users } from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { FaUsers, FaUserCircle } from "react-icons/fa";
import { MdPeopleOutline } from "react-icons/md";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const toast = useToast();

  const headerSize = useBreakpointValue({ base: "lg", md: "xl" });
  const containerWidth = useBreakpointValue({ base: "95%", md: "90%", lg: "50%" });

  const handleSearch = async () => {
    if (!search.trim()) {
      toast({
        title: "Please enter a search term",
        status: "warning",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const users = await search_users(search);
      setUsers(users);
      setHasSearched(true);

      if (users.length === 0) {
        toast({
          title: "No users found",
          description: "Try a different search term",
          status: "info",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again later",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box w="100%" minH="100vh" pb={8}>
      <Container maxW={containerWidth} pt={{ base: 4, md: 8 }} px={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 6, md: 8 }} w="full" align="stretch">
          {/* Header Section */}
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={4}
          >
            <HStack spacing={3}>
              <Circle size={12} bg="purple.500" color="white">
                <Icon as={FaUsers} boxSize={5} />
              </Circle>
              <Heading size={headerSize}>
                Find People
              </Heading>
            </HStack>
            <Badge
              colorScheme="purple"
              p={2}
              borderRadius="full"
              display={users.length ? "block" : "none"}
            >
              {users.length} user{users.length !== 1 ? 's' : ''} found
            </Badge>
          </Flex>

          {/* Search Section */}
          <Box
            position="relative"
          >
            <HStack spacing={4}>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search by username..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  bg={'white'}
                  focusBorderColor="purple.500"
                  onKeyPress={handleKeyPress}
                  borderRadius="lg"
                  pl={10}
                  boxShadow="sm"
                />
              </InputGroup>
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                colorScheme="purple"
                size="lg"
                borderRadius="full"
                onClick={handleSearch}
                isLoading={loading}
                w="full"
                maxW="20px"
              />
            </HStack>
          </Box>

          {/* Results Section */}
          <Box w="full">
            {loading ? (
              <VStack spacing={4}>
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    height="100px"
                    width="full"
                    borderRadius="xl"
                  />
                ))}
              </VStack>
            ) : (
              <>
                {hasSearched && users.length === 0 ? (
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    py={10}
                    borderRadius="xl"
                    borderWidth={'1px'}
                    boxShadow="sm"
                  >
                    <Icon as={MdPeopleOutline} boxSize={12} color="gray.400" mb={4} />
                    <Text color="gray.500" fontSize="lg">
                      No users found
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                      Try searching with a different term
                    </Text>
                  </Flex>
                ) : (
                  <VStack spacing={4}>
                    {users.map((user) => (
                      <UserProfile
                        key={user.username}
                        username={user.username}
                        profile_image={user.profile_image}
                        first_name={user.first_name}
                        last_name={user.last_name}
                      />
                    ))}
                  </VStack>
                )}
              </>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

const UserProfile = ({ username, profile_image, first_name, last_name }) => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.700");
  const nameColor = useColorModeValue("gray.700", "white");
  const usernameColor = useColorModeValue("gray.500", "gray.400");
  const imageSize = useBreakpointValue({ base: "50px", md: "60px" });

  return (
    <Flex
      direction="row"
      align="center"
      justify="space-between"
      w="full"
      bg={cardBg}
      p={{ base: 4, md: 5 }}
      borderRadius="xl"
      boxShadow="sm"
      transition="all 0.2s"
      borderWidth="1px"
      borderColor="gray.100"
      _hover={{
        boxShadow: "lg",
        cursor: "pointer",
        transform: "translateY(-2px)",
        borderColor: "purple.200"
      }}
      onClick={() => navigate(`/${username}`)}
    >
      <HStack spacing={4}>
        <Box position="relative">
          <Image
            src={`${SERVER_URL}${profile_image}`}
            alt={`${first_name} ${last_name}`}
            borderRadius="full"
            boxSize={imageSize}
            fallbackSrc="https://via.placeholder.com/60"
          />
          <Icon
            as={FaUserCircle}
            position="absolute"
            bottom="-2px"
            right="-2px"
            color="purple.500"
            bg="white"
            borderRadius="full"
            boxSize={5}
          />
        </Box>

        <VStack align="start" spacing={1}>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            color={nameColor}
          >
            {first_name} {last_name}
          </Text>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color={usernameColor}
          >
            @{username}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default Search;