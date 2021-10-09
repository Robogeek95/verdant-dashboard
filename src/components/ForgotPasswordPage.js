import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { requestForgotPassword } from '../redux/actions/authActions';

export default function ForgotPassword({ history }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const forgetPasswordRequest = useSelector(
    state => state.requestForgotPassword
  );
  const { loading, error, success } = forgetPasswordRequest;

  const userLogin = useSelector(state => state.login);
  const { userInfo } = userLogin;
  const toast = useToast();

  useEffect(() => {
    if (userInfo) {
      window.location = '/';
    }
  }, [history, userInfo]);

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  function onSubmit(data) {
    const payload = {
      email: data.email,
    };

    console.log(payload);
    dispatch(requestForgotPassword(payload));
  }

  useEffect(() => {
    if (success) {
      onOpen();
    }
  }, [onOpen, success]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'We could not log you in.',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [error, toast]);

  function SuccessModal() {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Stack align={'center'}>
              <Image src="/logo.png" mb={'6'} />
            </Stack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              mx={'auto'}
              px={20}
              bg={useColorModeValue('white', 'gray.700')}
            >
              <Stack spacing={4}>
                <Image src="/email_notification.png" mb={'6'} />
                <Heading textAlign="center" fontSize={'2xl'}>
                  Check your mail
                </Heading>
                <Text
                  textAlign="center"
                  fontSize={'lg'}
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  We have sent password recovery instructions to your email
                </Text>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack w={'100%'}>
              <Button
                as="a"
                href="/login"
                bg={'brand.primary'}
                color={'white'}
                _hover={{
                  bg: 'brand.secondary',
                }}
              >
                Back to Login
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

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
              Forgot Password
            </Heading>
            <Text
              textAlign="center"
              fontSize={'lg'}
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              Enter your official email and we’ll send an email with
              instructions to reset your password.
            </Text>
          </Stack>

          <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
            <FormControl id="username">
              <FormLabel>Email Address</FormLabel>
              <Input
                {...register('email', { required: true })}
                type="email"
                placeholder="Enter email address"
              />
              {errors.email?.type === 'required' && (
                <Text color="red.500" fontSize="xs" mt="2">
                  Email address is required
                </Text>
              )}
            </FormControl>

            <Stack spacing={10}>
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

              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'center'}
              >
                <Text>Remember password?</Text>
                <Link href="/login" color={'brand.secondary'}>
                  Login
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Flex>

      <SuccessModal />
    </>
  );
}
