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
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import { search_users } from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const headerSize = useBreakpointValue({ base: "lg", md: "xl" });
  const containerWidth = useBreakpointValue({ base: "95%", md: "90%", lg: "50%" });

  const handleSearch = async () => {
    setLoading(true);
    const users = await search_users(search);
    setUsers(users);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box w="100%" minH="100vh" overflowX="hidden"> {/* Prevent horizontal scrolling */}
      <Container maxW={containerWidth} pt={{ base: 4, md: 8 }} px={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 4, md: 8 }} w="full" align="stretch">
          {/* Search Section */}
          <VStack spacing={4} align="stretch">
            <Heading
              size={headerSize}
              textAlign={{ base: "center", md: "left" }}
            >
              Search Users
            </Heading>

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              w="full"
              py={4}
              align="center"
            >
              <Input
                placeholder="Search for users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="lg"
                p={5}
                bg={'white'}
                focusBorderColor="purple.500"
                onKeyPress={handleKeyPress}
                borderRadius="lg"
              />
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                colorScheme="purple"
                size="lg"
                borderRadius="full"
                onClick={handleSearch}
                isLoading={loading}
                flexShrink={0}
              />
            </Flex>
          </VStack>

          {/* User Profiles */}
          <Box w="full">
            {loading ? (
              <VStack spacing={4}>
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    height="80px"
                    width="full"
                    borderRadius="md"
                  />
                ))}
              </VStack>
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
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

const UserProfile = ({ username, profile_image, first_name, last_name }) => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.800");
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
      p={{ base: 3, md: 4 }}
      borderRadius="md"
      boxShadow="sm"
      transition="all 0.2s" 
      borderWidth="0.1px" 
      borderColor={"gray.100"}
      borderStyle="solid"
      _hover={{
        boxShadow: "lg",
        cursor: "pointer",
        transform: "translateY(-2px)"
      }}
      onClick={() => navigate(`/${username}`)}
    >
      <HStack spacing={4}>
        <Box>
          <Image
            src={`${SERVER_URL}${profile_image}`}
            alt={`${first_name} ${last_name}`}
            borderRadius="full"
            boxSize={imageSize}
            fallbackSrc="https://via.placeholder.com/60"
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
            fontSize={{ base: "xs", md: "sm" }}
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
