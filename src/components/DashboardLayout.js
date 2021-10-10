import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  FiSettings,
  FiMenu,
  FiBell,
  FiGrid,
  FiUser,
  FiCodesandbox,
  FiShoppingCart,
  FiLogOut,
  FiSearch,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { logout } from '../redux/actions/authActions';

const LinkItems = {
  top: [
    { name: 'Dashboard', icon: FiGrid },
    { name: 'Users', icon: FiUser },
    { name: 'Products', icon: FiCodesandbox },
    { name: 'Orders', icon: FiShoppingCart },
    { name: 'Settings', icon: FiSettings },
  ],
  bottom: [{ name: 'Logout', icon: FiLogOut }],
};

export default function DashboardLayout({ children }) {
  const [active, setActive] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userLogin = useSelector(state => state.login);
  const { userInfo } = userLogin;
  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname.split('/')[1]);
  }, [location.pathname]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        active={active}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            active={active}
            user={userInfo?.user}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} user={userInfo?.user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ active, onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      py={6}
    >
      <Flex
        // h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <Image src="/logo.png" mb={'6'} />

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Grid h={'100%'}>
        <GridItem rowSpan="3">
          {LinkItems.top.map(link => (
            <NavItem
              key={link.name}
              icon={link.icon}
              active={link.name.toLowerCase() === active.toLowerCase()}
              href={`/${link.name.toLowerCase()}`}
            >
              {link.name}
            </NavItem>
          ))}
        </GridItem>

        <GridItem>
          {LinkItems.bottom.map(link => (
            <NavItem key={link.name} name={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </GridItem>
      </Grid>
    </Box>
  );
};

const NavItem = ({ active, icon, href, name, children, ...rest }) => {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Link
      href={href}
      onClick={name?.toLowerCase() === 'logout' ? handleLogout : null}
      style={{ textDecoration: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        ml="4"
        bg={active ? 'gray.200' : ''}
        color={active ? 'brand.primary' : ''}
        borderLeftRadius="3xl"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'gray.200',
          color: 'brand.primary',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'brand.primary',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ user, onOpen, ...rest }) => {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={'space-between'}
      gridGap="4"
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <InputGroup maxW={'300px'} id="email">
        <Input bg="gray.100" type="email" placeholder="Search for Products" />
        <InputRightElement
          children={
            <Flex
              align="center"
              justify="center"
              bg="brand.secondary"
              w="100%"
              h="100%"
              color="gray.100"
              borderRightRadius="lg"
            >
              <FiSearch />
            </Flex>
          }
        />
      </InputGroup>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} src={user?.avatar} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Administrator
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
