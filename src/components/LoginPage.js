import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useToast } from '@chakra-ui/react';

export default function LoginPage({ history }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.login);
  const { loading, error, userInfo, success } = userLogin;
  const toast = useToast();

  useEffect(() => {
    if (userInfo) {
      window.location = '/';
    }
  }, [history, userInfo]);

  function onSubmit(data) {
    const payload = {
      email: data.email,
      id: data.id,
      password: data.password,
    };

    console.log(payload);
    dispatch(login(payload));
  }

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

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={8}
          mx={'auto'}
          w={'lg'}
          py={10}
          px={20}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
        >
          <Stack align={'center'}>
            <Image src="/logo.png" mb={'6'} />
            <Heading textAlign="center" fontSize={'2xl'}>
              Welcome Back
            </Heading>
            <Text
              textAlign="center"
              fontSize={'lg'}
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              Sign in to your Dashboard
            </Text>
          </Stack>

          <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                {...register('email', { required: true })}
                type="email"
                placeholder="enter email"
              />
              {errors.email?.type === 'required' && (
                <Text color="red.500" fontSize="xs" mt="2">
                  Email is required
                </Text>
              )}
            </FormControl>

            <FormControl id="staffId">
              <FormLabel>Staff ID</FormLabel>
              <Input
                {...register('id', { required: true })}
                type="text"
                placeholder="12345"
              />
              {errors.id?.type === 'required' && (
                <Text color="red.500" fontSize="xs" mt="2">
                  Staff ID is required
                </Text>
              )}
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                {...register('password', { required: true, minLength: 6 })}
                type="password"
                placeholder="Password"
              />
              {errors.password?.type === 'required' && (
                <Text color="red.500" fontSize="xs" mt="2">
                  Password is required
                </Text>
              )}
              {errors.password?.type === 'minLength' && (
                <Text color="red.500" fontSize="xs" mt="2">
                  Password is too short, minimum of six characters
                </Text>
              )}
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link href="/forgot-password" color={'brand.secondary'}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                type="submit"
                bg={'brand.primary'}
                color={'white'}
                isLoading={loading}
                _hover={{
                  bg: 'brand.secondary',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
