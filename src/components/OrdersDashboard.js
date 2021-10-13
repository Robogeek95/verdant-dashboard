import React, { useEffect, useState } from 'react';
import { Box, Divider, Stack, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import ProductsDataTable from './ProductsDataTable';
import { getOrders } from '../redux/actions/ordersActions';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import { Skeleton } from '@chakra-ui/skeleton';

export default function OrdersDashboard() {
  const [tab, setTab] = useState('recent');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const dispatch = useDispatch();
  const toast = useToast();

  const orderState = useSelector(state => state.orders);
  const { loading, error, ordersData } = orderState;

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchOrders() {
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
      if (tab === 'recent') {
        setFilteredOrders(ordersData.filter(order => !order.isAdmin));
      } else if (tab === 'pending') {
        setFilteredOrders(ordersData.filter(order => order.isAdmin));
      } else if (tab === 'delivered') {
        setFilteredOrders(ordersData.filter(order => order.isAdmin));
      } else if (tab === 'transit') {
        setFilteredOrders(ordersData.filter(order => order.isAdmin));
      } else {
        setFilteredOrders(ordersData);
      }
    }
  }, [ordersData, tab]);

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" p={5}>
        Orders
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
            px={10}
            pt={10}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing="10">
              <Stack
                onClick={() => setTab('recent')}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" color="gray.500">
                  Recent Orders
                </Text>

                <Box
                  w="120px"
                  position="absolute"
                  bg={tab === 'recent' ? 'brand.primary' : 'transparent'}
                  h="3px"
                  borderRadius="xl"
                  bottom="-4"
                />
              </Stack>

              <Stack
                onClick={() => setTab('all')}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" color="gray.500">
                  All Orders
                </Text>

                <Box
                  w="120px"
                  position="absolute"
                  bg={tab === 'all' ? 'brand.primary' : 'transparent'}
                  h="3px"
                  borderRadius="xl"
                  bottom="-4"
                />
              </Stack>

              <Stack
                onClick={() => setTab('delivered')}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" color="gray.500">
                  Delivered
                </Text>

                <Box
                  w="120px"
                  position="absolute"
                  bg={tab === 'delivered' ? 'brand.primary' : 'transparent'}
                  h="3px"
                  borderRadius="xl"
                  bottom="-4"
                />
              </Stack>

              <Stack
                onClick={() => setTab('transit')}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" color="gray.500">
                  In-transit
                </Text>

                <Box
                  w="120px"
                  position="absolute"
                  bg={tab === 'transit' ? 'brand.primary' : 'transparent'}
                  h="3px"
                  borderRadius="xl"
                  bottom="-4"
                />
              </Stack>

              <Stack
                onClick={() => setTab('pending')}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" color="gray.500">
                  Pending
                </Text>

                <Box
                  w="120px"
                  position="absolute"
                  bg={tab === 'pending' ? 'brand.primary' : 'transparent'}
                  h="3px"
                  borderRadius="xl"
                  bottom="-4"
                />
              </Stack>
            </Stack>

            <Select maxW="150px" variant="filled" placeholder="Select">
              <option value="option1">All Customers</option>
            </Select>
          </Stack>

          <Divider mt="4" />
        </Box>

        <Box p="10" overflow="auto">
          {!loading && ordersData && ordersData.length >= 0 ? (
            <ProductsDataTable data={filteredOrders} />
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
