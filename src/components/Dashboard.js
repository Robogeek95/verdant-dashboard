import { Button } from '@chakra-ui/button';
import { Center, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

export default function Dashboard() {
  const userLogin = useSelector(state => state.login);
  const { userInfo, loading, error, success } = userLogin;
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      window.location = '/login';
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      toast({
        title: 'Successfully logged in.',
        description: `Welcome back.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [success, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'We could not log you in.',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [error, toast]);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div>
      <Center mt="20">
        <Stack>
          <Text>
            Hello, you are currently logged in as {userInfo?.user?.name}
          </Text>

          <Button
            type="submit"
            bg={'brand.primary'}
            color={'white'}
            isLoading={loading}
            onClick={handleLogout}
            _hover={{
              bg: 'brand.secondary',
            }}
          >
            Logout
          </Button>
        </Stack>
      </Center>
    </div>
  );
}
