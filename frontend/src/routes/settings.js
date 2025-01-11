import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  Text,
  useToast,
  Card,
  CardBody,
  Icon,
  HStack,
  Divider,
  SimpleGrid,
  Badge,
  useColorModeValue,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import {
  Camera,
  User,
  Mail,
  Save,
  Shield,
  Bell,
  Key,
  Lock,
  LogOut,
  Info,
  FileText,
  CheckCircle
} from "lucide-react";
import { update_user } from "../api/endpoints";
import { useAuth } from "../contexts/useAuth";

const Settings = () => {
  const toast = useToast();
  const { auth_logout } = useAuth();
  const storage = JSON.parse(localStorage.getItem("userData"));
  const bgAccent = useColorModeValue('purple.50', 'purple.900');
  const borderColor = useColorModeValue('purple.100', 'purple.700');

  const [selectedFileName, setSelectedFileName] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    username: storage?.username || "",
    email: storage?.email || "",
    firstName: storage?.first_name || "",
    lastName: storage?.last_name || "",
    bio: storage?.bio || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setSelectedFileName(file.name);
    }
  };

  const handleLogout = () => {
    auth_logout();
    toast({
      title: "Logged out",
      status: "error",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  };

  const handleUpdate = async () => {
    try {
      // Create update payload without profile_image first
      const updatePayload = {
        username: formData.username,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        bio: formData.bio,
      };

      // Only add profile_image to payload if it was changed
      if (formData.profileImage) {
        updatePayload.profile_image = formData.profileImage;
      }

      await update_user(updatePayload);

      // Store in localStorage without the profile image
      const storageData = {
        username: formData.username,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        bio: formData.bio,
        // Preserve the existing profile_image in storage
        profile_image: storage?.profile_image
      };

      localStorage.setItem('userData', JSON.stringify(storageData));

      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      const username = formData.username;
      if (username) {
        window.location.href = `/${username}`;
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Profile Information', icon: User },
    // { id: 'notifications', label: 'Notifications', icon: Bell },
    // { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'about', label: 'About Social Lib', icon: Info },
    { id: 'terms', label: 'Terms & Agreements', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <VStack spacing={6}>
            <Box
              w="full"
              p={4}
              bg={bgAccent}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
                <VStack align="flex-start" spacing={1}>
                  <Text fontWeight="bold">Profile Picture</Text>
                  <Text fontSize="sm" color="gray.600">
                    Upload a new profile picture
                  </Text>
                  {selectedFileName && (
                    <Text fontSize="sm" color="purple.500">
                      Selected: {selectedFileName}
                    </Text>
                  )}
                </VStack>
                <FormControl w="auto">
                  <Button
                    leftIcon={<Icon as={Camera} />}
                    variant="outline"
                    size="sm"
                    as="label"
                    cursor="pointer"
                    colorScheme="purple"
                  >
                    {selectedFileName ? 'Change Photo' : 'Upload Photo'}
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </FormControl>
              </Flex>
            </Box>

            <Box w="full">
              <HStack mb={4}>
                <Icon as={User} />
                <Text fontWeight="bold">Personal Information</Text>
              </HStack>

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </FormControl>
              </SimpleGrid>
            </Box>

            <Divider />

            <Box w="full">
              <HStack mb={4}>
                <Icon as={Lock} />
                <Text fontWeight="bold">Account Information</Text>
              </HStack>

              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>
                    Username
                    <Badge ml={2} colorScheme="purple">Public</Badge>
                  </FormLabel>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    Email Address
                    <Badge ml={2} colorScheme="green">Verified</Badge>
                  </FormLabel>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                    resize="vertical"
                  />
                </FormControl>
              </VStack>
            </Box>

            <Flex w="full" justify="flex-end" pt={4}>
              <Button
                leftIcon={<Icon as={Save} />}
                colorScheme="purple"
                size="lg"
                onClick={handleUpdate}
              >
                Save Changes
              </Button>
            </Flex>
          </VStack>
        );

      case 'about':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md">About Social Lib</Heading>
            <Text>
              Social Lib is a minimalist social platform focused on pure expression through words.
              We believe in the power of concise, thoughtful communication without the distractions
              of images or direct messaging.
            </Text>

            <Box>
              <Heading size="sm" mb={4}>Our Core Features:</Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckCircle} color="purple.500" />
                  Pure text-based posts for focused communication
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircle} color="purple.500" />
                  Clean, distraction-free interface
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircle} color="purple.500" />
                  Public discourse without private messaging
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircle} color="purple.500" />
                  Focus on building public communities
                </ListItem>
              </List>
            </Box>

            <Text>
              Version 1.0.0
            </Text>
          </VStack>
        );

      case 'terms':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md">Terms & Agreements</Heading>
            <Text>
              By using Social Lib, you agree to the following terms and conditions:
            </Text>

            <VStack align="stretch" spacing={4}>
              <Box>
                <Heading size="sm" mb={2}>1. Content Guidelines</Heading>
                <Text>
                  Users are responsible for all content they post. Posts must not contain hate speech,
                  harassment, or explicit content. Text-only posts ensure focus on meaningful communication.
                </Text>
              </Box>

              <Box>
                <Heading size="sm" mb={2}>2. Privacy Policy</Heading>
                <Text>
                  All posts are public. While we don't support direct messaging, we protect your
                  account information and email address. Profile information is visible to all users.
                </Text>
              </Box>

              <Box>
                <Heading size="sm" mb={2}>3. User Conduct</Heading>
                <Text>
                  Users must maintain respectful discourse. Multiple violations of our guidelines
                  may result in account suspension or termination.
                </Text>
              </Box>
            </VStack>
          </VStack>
        );

      default:
        return (
          <VStack spacing={4} align="stretch">
            <Heading size="md">Coming Soon</Heading>
            <Text>This section is currently under development.</Text>
          </VStack>
        );
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <Box textAlign="center" w="full">
          <Heading size="xl" mb={2}>Account Settings</Heading>
          <Text color="gray.600">Manage your profile and account preferences</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
          <Card variant="outline" h="fit-content">
            <CardBody>
              <VStack align="stretch" spacing={3}>
                <Text fontWeight="bold" mb={2}>Settings Menu</Text>
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    justifyContent="flex-start"
                    leftIcon={<Icon as={item.icon} />}
                    colorScheme="purple"
                    isActive={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}
                <Divider />
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<Icon as={LogOut} />}
                  colorScheme="red"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card variant="outline" gridColumn={{ base: "1", md: "2 / span 2" }}>
            <CardBody>
              {renderContent()}
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Settings;