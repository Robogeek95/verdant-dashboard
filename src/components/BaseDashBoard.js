import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React, { useEffect, useState } from 'react';
import ProductsDataTable from './ProductsDataTable';
import {
  FiCircle,
  FiCodesandbox,
  FiRefreshCw,
  FiShoppingCart,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../redux/actions/ordersActions';
import { useToast } from '@chakra-ui/toast';

import {
  Skeleton,
  Stack,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';

function Product({ data }) {
  const { name, amount, image } = data;

  return (
    <Flex alignItems="center" gridGap="10px">
      <Image src={image} mb={'6'} h="74px" />

      <Box>
        <Text fontSize="md">{name}</Text>
        <Text fontSize="lg" fontWeight="bold">
          ₦{amount}
        </Text>
      </Box>
    </Flex>
  );
}

export default function BaseDashBoard() {
  const dispatch = useDispatch();
  const toast = useToast();

  const orderState = useSelector(state => state.orders);
  const { loading, error, ordersData } = orderState;

  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getProducts() {
    dispatch(getOrders());
  }

  useEffect(() => {
    if (error) {
      toast({
        title: 'We could not fetch orders.',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (ordersData && ordersData.length > 0) {
      setTopSellingProducts(ordersData.splice(0, 4));
    }
  }, [ordersData]);

  return (
    <Box>
      <Flex justifyContent="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Overview
        </Text>
        <Button
          color="brand.primary"
          isLoading={loading}
          leftIcon={<FiRefreshCw />}
          onClick={getProducts}
        >
          Refresh
        </Button>
      </Flex>

      <Grid
        templateColumns={['repeat(2, 1fr)', null, null, 'repeat(4, 1fr)']}
        mt={5}
        borderRadius="lg"
        bg="white"
        boxShadow="md"
        px={'32px'}
        py={'35px'}
        gridGap="10"
      >
        {!loading && ordersData && ordersData.length > 0 ? (
          <>
            <Flex
              borderRight={[0, null, null, '1px solid']}
              borderColor="blue.300"
              alignItems="center"
              gridGap="5"
            >
              <Flex
                alignItems="center"
                justify="center"
                fontSize="3xl"
                color="brand.secondary"
                borderRadius="lg"
                bg="#FFDD89"
                p="4"
              >
                <FiShoppingCart />
              </Flex>

              <Box>
                <Text fontSize="lg">Total Orders</Text>
                <Text fontSize="md" fontWeight="bold">
                  {ordersData.length}
                </Text>
              </Box>
            </Flex>
          </>
        ) : (
          <>
            <Flex alignItems="center" gridGap="5">
              <Skeleton height="60px" width="60px" borderRadius="lg" />

              <Box>
                <SkeletonText noOfLines={2} width="80px" />
              </Box>
            </Flex>
          </>
        )}

        <Flex
          borderRight={[0, null, null, '1px solid']}
          borderColor="blue.300"
          alignItems="center"
          gridGap="5"
        >
          <Flex
            alignItems="center"
            justify="center"
            fontSize="3xl"
            color="#58355E"
            borderRadius="lg"
            bg="#58355e80"
            p="4"
          >
            <FiCodesandbox />
          </Flex>

          <Box>
            <Text fontSize="lg">Total Products</Text>
            <Text fontSize="md" fontWeight="bold">
              12,050
            </Text>
          </Box>
        </Flex>

        <Flex
          borderRight={[0, null, null, '1px solid']}
          borderColor="blue.300"
          alignItems="center"
          gridGap="5"
        >
          <Flex
            alignItems="center"
            justify="center"
            fontSize="3xl"
            color="brand.primary"
            borderRadius="lg"
            bg="#3785f766"
            p="4"
          >
            <FiShoppingCart />
          </Flex>

          <Box>
            <Text fontSize="lg">Total Payments</Text>
            <Text fontSize="md" fontWeight="bold">
              12,050
            </Text>
          </Box>
        </Flex>

        <Flex alignItems="center" gridGap="5">
          <Flex
            alignItems="center"
            justify="center"
            fontSize="3xl"
            color="#7AE7C7"
            borderRadius="lg"
            bg="#7ae7c757"
            p="4"
          >
            <FiShoppingCart />
          </Flex>

          <Box>
            <Text fontSize="lg">Total Invoices Sent</Text>
            <Text fontSize="md" fontWeight="bold">
              12,050
            </Text>
          </Box>
        </Flex>
      </Grid>

      <Grid
        templateColumns={['1fr', null, null, 'repeat(2, 1fr)']}
        mt={5}
        borderRadius="lg"
        gridGap="10"
      >
        <Box
          bg="white"
          boxShadow="md"
          px={["10px", null, '32px']}
          py={'20px'}
          borderRadius="lg"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">
              Performance per Category
            </Text>

            <Select
              maxW="150px"
              variant="filled"
              placeholder="Select time-frame"
            >
              <option value="option1">Today</option>
              <option value="option2">This week</option>
              <option value="option3">Last Week</option>
              <option value="option3">2 Weeks</option>
            </Select>
          </Flex>

          <Flex justifyContent="space-around" alignItems="center" pt="10">
            <Box>
              <SkeletonCircle size="260" />
            </Box>

            <Box mt="6" justifySelf="right">
              <Flex mt="3" alignItems="center">
                <FiCircle color="#3785F7" fill="#3785F7" size="12px" />
                <Text ml="3">Groceries</Text>
              </Flex>
              <Flex mt="3" alignItems="center">
                <FiCircle color="#F6C54C" fill="#F6C54C" size="12px" />
                <Text ml="3">Medicals</Text>
              </Flex>
              <Flex mt="3" alignItems="center">
                <FiCircle color="#58355E" fill="#58355E" size="12px" />
                <Text ml="3">Payments</Text>
              </Flex>
              <Flex mt="3" alignItems="center">
                <FiCircle color="#7AE7C7" fill="#7AE7C7" size="12px" />
                <Text ml="3">Uploads</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Box
          bg="white"
          boxShadow="md"
          px={'32px'}
          py={'35px'}
          borderRadius="lg"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">
              Top Selling Products
            </Text>

            <Select
              maxW="150px"
              variant="filled"
              placeholder="Select time-frame"
            >
              <option value="option1">Today</option>
              <option value="option2">This week</option>
              <option value="option3">Last Week</option>
              <option value="option3">2 Weeks</option>
            </Select>
          </Flex>

          <Grid templateColumns="repeat(2, 1fr)" mt="5" gridGap="5">
            {!loading && ordersData && ordersData.length >= 0 ? (
              topSellingProducts.map(product => <Product data={product} />)
            ) : (
              <>
                <Skeleton height="135px" borderRadius="md" />
                <Skeleton height="135px" borderRadius="md" />
                <Skeleton height="135px" borderRadius="md" />
              </>
            )}
          </Grid>
        </Box>
      </Grid>

      <Box
        mt={5}
        borderRadius="lg"
        bg="white"
        boxShadow="md"
        px={'32px'}
        py={'35px'}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            Recent Orders
          </Text>

          <Button
            bg="brand.primary"
            color={'white'}
            _hover={{
              bg: 'brand.secondary',
            }}
            disabled={loading}
          >
            View all
          </Button>
        </Flex>

        <Box mt="5" overflow="auto">
          {!loading && ordersData && ordersData.length >= 0 ? (
            <ProductsDataTable data={ordersData?.slice(0, 7)} />
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
      </Box>
    </Box>
  );
}
