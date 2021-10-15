import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, GridItem, Stack, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { getOrders } from '../redux/actions/ordersActions';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import { Skeleton } from '@chakra-ui/skeleton';
import { Avatar } from '@chakra-ui/avatar';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/button';
import { updateUserDetails } from '../redux/actions/userActions';
import CategoryDataTable from './CategoryDataTable';
import { getCategories } from '../redux/actions/categoriesActions';
import { FiPlus } from 'react-icons/fi';

function ProfileForm({ formData }) {
  const dispatch = useDispatch();
  const toast = useToast();

  const userState = useSelector(state => state.user);
  const { error: detailError, updated, loading } = userState;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  useEffect(() => {
    if (updated) {
      toast({
        title: 'Success',
        description: `User data updated.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [toast, updated]);

  useEffect(() => {
    if (detailError) {
      toast({
        title: 'Error updating your profile',
        description: detailError,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [toast, detailError]);

  function onSubmit(data) {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: String(data.phone),
      // designation: data.designation,
      // sex: data.sex,
    };

    dispatch(updateUserDetails(payload));
  }

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
      <FormControl id="name">
        <FormLabel>Full name</FormLabel>
        <Input
          {...register('name', { required: true })}
          type="text"
          placeholder="Enter name"
        />
        {errors.name?.type === 'required' && (
          <Text color="red.500" fontSize="xs" mt="2">
            Name is required
          </Text>
        )}
      </FormControl>

      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          {...register('email', { required: true })}
          type="email"
          placeholder="Enter email"
        />
        {errors.email?.type === 'required' && (
          <Text color="red.500" fontSize="xs" mt="2">
            Email is required
          </Text>
        )}
      </FormControl>

      <FormControl id="phone">
        <FormLabel>Phone number</FormLabel>
        <Input
          {...register('phone', { required: true })}
          type="phone"
          placeholder="Enter phone"
        />
        {errors.phone?.type === 'required' && (
          <Text color="red.500" fontSize="xs" mt="2">
            Phone number is required
          </Text>
        )}
      </FormControl>

      <Grid gridGap="5" templateColumns="repeat(2, 1fr)">
        <FormControl id="designation">
          <FormLabel>Designation</FormLabel>

          <Select placeholder="Select designation" {...register('designation')}>
            <option value="option1">Administrator</option>
          </Select>
        </FormControl>

        <FormControl id="staffId">
          <FormLabel>Sex</FormLabel>

          <Select placeholder="Select sex" {...register('sex')}>
            <option value="option1">Male</option>
            <option value="option1">Female</option>
          </Select>
        </FormControl>
      </Grid>

      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          {...register('password', {
            required: true,
            minLength: 6,
          })}
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
        <Button
          type="submit"
          bg={'brand.primary'}
          color={'white'}
          isLoading={loading}
          _hover={{
            bg: 'brand.secondary',
          }}
        >
          Update
        </Button>
      </Stack>
    </Stack>
  );
}

export default function SettingsDashboard() {
  const toast = useToast();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [tab, setTab] = useState('profile');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const userState = useSelector(state => state.user);
  const { userInfo } = userState;

  const categoriesState = useSelector(state => state.categories);
  const {
    error: categoriesError,
    loading: loadingCategories,
    data: categoriesData,
  } = categoriesState;

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchOrders() {
    dispatch(getCategories());
  }

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setFilteredOrders(categoriesData);
    }
  }, [categoriesData, tab]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo?.name,
        email: userInfo?.email,
        phone: userInfo?.phone,
        designation: userInfo?.designation,
        sex: userInfo?.sex,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (categoriesError) {
      toast({
        title: 'We could not fetch orders.',
        description: categoriesError,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [categoriesError, toast]);

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" p={5}>
        Settings
      </Text>

      <Box
        w="100%"
        h="100%"
        minH="200px"
        bg="white"
        boxShadow="md"
        borderRadius="lg"
      >
        <Box>
          <Stack
            position="relative"
            direction="row"
            px={20}
            pt={10}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing="10">
              <Stack
                onClick={() => setTab('profile')}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" color="gray.500">
                  Profile
                </Text>

                <Box
                  w="120px"
                  position="absolute"
                  bg={tab === 'profile' ? 'brand.primary' : 'transparent'}
                  h="3px"
                  borderRadius="xl"
                  bottom="-4"
                />
              </Stack>

              <Stack
                onClick={() => setTab('category')}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" color="gray.500">
                  Category
                </Text>

                <Box
                  w="120px"
                  position="absolute"
                  bg={tab === 'category' ? 'brand.primary' : 'transparent'}
                  h="3px"
                  borderRadius="xl"
                  bottom="-4"
                />
              </Stack>
            </Stack>

            <Button
              colorScheme="blue"
              bg="blue.100"
              color="blue.500"
              _hover={{ color: 'blue.800' }}
            >
              <FiPlus />
              Add new category
            </Button>
          </Stack>

          <Divider mt="4" />
        </Box>
        {tab === 'profile' && Object.keys(formData).length >= 1 && (
          <>
            <Grid gridGap="20" templateColumns="repeat(5, 1fr)" p={20}>
              <GridItem colSpan="2">
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  bg="gray.200"
                  borderRadius="lg"
                  p={10}
                  spacing={6}
                >
                  <Avatar size="2xl" />

                  <Box textAlign="center">
                    <Text fontSize="2xl">{userInfo?.name}</Text>
                    <Text fontSize="lg" color="brand.primary">
                      {userInfo?.role || 'Administrator'}
                    </Text>
                  </Box>

                  <Stack
                    w={'100%'}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Designation
                      </Text>
                      <Text fontSize="lg">
                        {userInfo?.designation || 'Product manager'}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </GridItem>

              <GridItem colSpan="3">
                <ProfileForm formData={formData} />
              </GridItem>
            </Grid>
          </>
        )}
        {tab === 'category' && (
          <Box p="10" overflow="auto">
            {!loadingCategories &&
            categoriesData &&
            categoriesData.length >= 0 ? (
              <CategoryDataTable data={filteredOrders} />
            ) : (
              <Stack spacing={5}>
                <Skeleton height="35px" borderRadius="md" />
                <Skeleton height="35px" borderRadius="md" />
                <Skeleton height="35px" borderRadius="md" />
                <Skeleton height="35px" borderRadius="md" />
                <Skeleton height="35px" borderRadius="md" />
              </Stack>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
