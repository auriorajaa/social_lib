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
  Icon
} from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom"
import { HamburgerIcon } from "@chakra-ui/icons"
import { MdHome, MdPerson, MdCreate, MdSearch } from "react-icons/md"

const Navbar = () => {
  const nav = useNavigate()
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const bgColor = useColorModeValue('purple.700')
  const textColor = useColorModeValue('gray.300')
  const activeColor = 'white'
  
  const handleNavigate = (route) => {
    nav(`/${route}`)
    onClose()
  }

  const handleNavigateUser = () => {
    const username = JSON.parse(localStorage.getItem('userData'))['username']
    nav(`/${username}`)
    onClose()
    window.location.reload()
  }

  const isActiveRoute = (route, pathname) => {
    if (route === '') {
      return pathname === '/'
    }
    if (route === 'profile') {
      const username = JSON.parse(localStorage.getItem('userData'))?.['username']
      return pathname === `/${username}`
    }
    return pathname.startsWith(`/${route}`)
  }

  const NavLink = ({ children, route, icon }) => {
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
        onClick={() => route === 'profile' ? handleNavigateUser() : handleNavigate(route)}
      >
        <Icon as={icon} mr={2} />
        {children}
      </Flex>
    )
  }

  const NavLinks = ({ direction = "row" }) => (
    <Flex 
      as={direction === "column" ? VStack : HStack} 
      spacing={4} 
      align="stretch"
      gap={4}
    >
      <NavLink route="" icon={MdHome}>Home</NavLink>
      <NavLink route="profile" icon={MdPerson}>Profile</NavLink>
      <NavLink route="create/post" icon={MdCreate}>Create Post</NavLink>
      <NavLink route="search" icon={MdSearch}>Search</NavLink>
    </Flex>
  )

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
            onClick={() => handleNavigate('')}
          >
            Social Lib
          </Text>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            <NavLinks />
          </HStack>

          {/* Mobile Navigation Button */}
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
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton color="white" />
          <DrawerHeader color={activeColor}>Social Lib</DrawerHeader>
          <DrawerBody>
            <NavLinks direction="column" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Navbar