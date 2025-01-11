import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Container,
  useColorModeValue,
  Icon,
  Divider,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom"
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { MdHome, MdPerson, MdCreate, MdSearch, MdLogout, MdSettings } from "react-icons/md"
import { useAuth } from "../contexts/useAuth"

const Navbar = () => {
  const nav = useNavigate()
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { auth, auth_logout } = useAuth()
  const toast = useToast()

  const bgColor = useColorModeValue('purple.700')
  const textColor = useColorModeValue('gray.300')
  const activeColor = 'white'
  const menuBg = useColorModeValue('white', 'gray.800')

  const handleNavigate = (route) => {
    nav(`/${route}`)
    onClose()
  }

  const handleNavigateUser = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const username = JSON.parse(userData)?.['username'];
      if (username) {
        nav(`/${username}`);
        onClose();
      }
    }
  }

  const handleLogout = () => {
    auth_logout()
    toast({
      title: "Logged out",
      status: "error",
      duration: 2000,
      position: "top",
      isClosable: true,
    })
  }

  const isActiveRoute = (route, pathname) => {
    if (route === '') {
      return pathname === '/'
    }
    if (route === 'profile') {
      const username = JSON.parse(localStorage.getItem('userData') || '{}')?.['username'];
      return pathname === `/${username}`
    }
    return pathname.startsWith(`/${route}`)
  }

  const NavLink = ({ children, route, icon, onClick }) => {
    const isActive = isActiveRoute(route, location.pathname)

    return (
      <Flex
        align="center"
        px={3}
        py={2}
        rounded="md"
        cursor="pointer"
        fontSize="md"
        fontWeight="medium"
        color={isActive ? activeColor : textColor}
        _hover={{
          transform: 'scale(1.05)',
          transition: 'all 0.3s ease',
          color: activeColor
        }}
        transition="all 0.2s"
        onClick={onClick || (route === 'profile' ? handleNavigateUser : () => handleNavigate(route))}
      >
        <Icon as={icon} mr={2} />
        {children}
      </Flex>
    )
  }

  const NavLinks = ({ direction = "row", showLogout = false }) => (
    <Flex
      as={direction === "column" ? VStack : HStack}
      spacing={4}
      align="stretch"
      gap={4}
    >
      {auth && (
        <>
          <NavLink route="" icon={MdHome}>Home</NavLink>
          <NavLink route="profile" icon={MdPerson}>Profile</NavLink>
          {/* <NavLink route="create/post" icon={MdCreate}>Create Post</NavLink> */}
          <NavLink route="search" icon={MdSearch}>Search</NavLink>
          <NavLink route='settings' icon={MdSettings}>Settings</NavLink>
          {showLogout && (
            <>
              <Divider borderColor="whiteAlpha.300" />
              <NavLink icon={MdLogout} onClick={handleLogout}>Logout</NavLink>
            </>
          )}
        </>
      )}
    </Flex>
  )

  const username = auth ? JSON.parse(localStorage.getItem('userData') || '{}')?.['username'] : null;

  return (
    <Box
      top="0"
      w="100%"
      bg={bgColor}
      boxShadow="sm"
      zIndex="sticky"
    >
      <Container maxW="container.xl" px={4}>
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={activeColor}
            cursor="pointer"
            onClick={() => auth ? handleNavigate('') : handleNavigate('login')}
          >
            Social Lib
          </Text>

          {auth && (
            <Flex alignItems="center">
              {/* Desktop Navigation */}
              <HStack spacing={8} display={{ base: "none", md: "flex" }}>
                <NavLinks />
                <Menu>
                  <MenuButton
                    as={Text}
                    cursor="pointer"
                    color={textColor}
                    _hover={{ color: activeColor }}
                    display="flex"
                    alignItems="center"
                  >
                    @{username} <ChevronDownIcon ml={1} />
                  </MenuButton>
                  <MenuList bg={menuBg}>
                    <MenuItem
                      icon={<MdLogout />}
                      onClick={handleLogout}
                      _hover={{
                        transform: 'scale(1.05)',
                        transition: 'all 0.3s ease',
                        bg: 'transparent',
                        color: 'red.500'
                      }}
                      transition="all 0.2s"
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>

              {/* Mobile Navigation Button - Moved outside HStack */}
              <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="ghost"
                icon={<HamburgerIcon />}
                aria-label="Open menu"
                size="lg"
                color="white"
                _hover={{
                  bg: 'purple.600'
                }}
              />
            </Flex>
          )}
        </Flex>
      </Container>

      {/* Mobile Navigation Drawer */}
      {auth && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg={bgColor}>
            <DrawerCloseButton color="white" />
            <DrawerHeader color={activeColor}>
              <Text>Social Lib</Text>
              <Text fontSize="sm" fontWeight="normal" mt={1}>@{username}</Text>
            </DrawerHeader>
            <DrawerBody>
              <NavLinks direction="column" showLogout={true} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  )
}

export default Navbar