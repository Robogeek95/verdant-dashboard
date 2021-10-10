import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React from 'react';
import ProductsDataTable from './ProductsDataTable';
import {
  FiCircle,
  FiCodesandbox,
  FiRefreshCw,
  FiShoppingCart,
} from 'react-icons/fi';

const orders = [
  {
    beneficary: {
      address: 'Great Gbenga',
      account_number: null,
      bank_code: null,
      country: 'GH',
      phone: '+233540470350',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Great Gbenga',
    },
    state: null,
    quantity: 2,
    amount: 470,
    image: null,
    meta: null,
    createdAt: '2021-09-27T01:42:58.666Z',
    user: '61511c2c92d412c8397687e7',
    ref: 'x9CZNYAHCxWR1F4WZers6',
    product_ref: 'T8SBBhGY4kt3Ndv8uL6GJ',
    name: 'Double Bull Rice (50KG)',
    id: '615124fba911c6001666e011',
  },
  {
    beneficary: {
      address: 'Great Gbenga',
      account_number: null,
      bank_code: null,
      country: 'GH',
      phone: '+233540470350',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Great Gbenga',
    },
    state: null,
    quantity: 2,
    amount: 470,
    image: null,
    meta: null,
    createdAt: '2021-09-27T02:00:35.886Z',
    user: '61511c2c92d412c8397687e7',
    ref: 'Na9I9tWwwOaDvXPiuKp__',
    product_ref: 'T8SBBhGY4kt3Ndv8uL6GJ',
    name: 'Double Bull Rice (50KG)',
    id: '6151264c656a2200160eb6e8',
  },
  {
    beneficary: {
      address: 'Great Gbenga',
      account_number: null,
      bank_code: null,
      country: 'GH',
      phone: '+233540470350',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Great Gbenga',
    },
    state: null,
    quantity: 2,
    amount: 470,
    image: null,
    meta: null,
    createdAt: '2021-09-27T02:04:11.482Z',
    user: '61511c2c92d412c8397687e7',
    ref: 'x_1_1zWdIcbww7r7sfq-j',
    product_ref: 'T8SBBhGY4kt3Ndv8uL6GJ',
    name: 'Double Bull Rice (50KG)',
    id: '615126f066d00500169ce0aa',
  },
  {
    beneficary: {
      address: 'Great Gbenga',
      account_number: null,
      bank_code: null,
      country: 'GH',
      phone: '+233540470350',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Great Gbenga',
    },
    state: null,
    quantity: 2,
    amount: 470,
    image: null,
    meta: null,
    createdAt: '2021-09-27T02:20:41.396Z',
    user: '61511c2c92d412c8397687e7',
    ref: 'rbO0GN7prv6jcj8SCN6jE',
    product_ref: 'T8SBBhGY4kt3Ndv8uL6GJ',
    name: 'Double Bull Rice (50KG)',
    id: '61512acba6d4ab0016561d6e',
  },
  {
    beneficary: {
      address: 'Yusuf Taiwo assan',
      account_number: null,
      bank_code: null,
      country: 'NG',
      phone: '+2335ss470350',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Yusuf Taiwo assan',
    },
    state: null,
    quantity: 20,
    amount: 4700,
    image: null,
    meta: null,
    createdAt: '2021-09-27T02:27:26.381Z',
    user: '61511c2c92d412c8397687e7',
    ref: 'aVMINxAp0HW_ln7BaJRFv',
    product_ref: 'T8SBBhGY4kt3Ndv8uL6GJ',
    name: 'Double Bull Rice (50KG)',
    id: '61512e19a1e90c00168913cc',
  },
  {
    beneficary: {
      address: 'Yusuf Taiwo assan',
      account_number: null,
      bank_code: null,
      country: 'NG',
      phone: '+2335ss470350',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Yusuf Taiwo assan',
    },
    state: null,
    quantity: 10,
    amount: 2350,
    image: null,
    meta: null,
    createdAt: '2021-09-27T02:27:26.381Z',
    user: '61511c2c92d412c8397687e7',
    ref: 'cI3ydB3M46zIcNxQmaV-u',
    product_ref: 'T8SBBhGY4kt3Ndv8uL6GJ',
    name: 'Double Bull Rice (50KG)',
    id: '61512e19a1e90c00168913cd',
  },
  {
    beneficary: {
      address: 'Azeez Lukman',
      account_number: null,
      bank_code: null,
      country: 'Nigeria',
      phone: '07010856052',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Azeez Lukman',
    },
    state: null,
    quantity: 1,
    amount: 18,
    image: null,
    meta: null,
    createdAt: '2021-10-01T10:44:20.830Z',
    user: '614c4e4c714d5bdd740ec771',
    ref: '96LZNktaiANRAhUmIfdZm',
    product_ref: 'z_IyRbQgi2khjM8zsQh9f',
    name: 'Tomato King Rice(25KG)',
    id: '61570c9be183420016c1af23',
  },
  {
    beneficary: {
      address: 'Gbenga Joseph',
      account_number: null,
      bank_code: null,
      country: 'Nigeria',
      phone: '+2347017808188',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Gbenga Joseph',
    },
    state: null,
    quantity: 3,
    amount: 70500,
    image: null,
    meta: null,
    createdAt: '2021-10-01T10:44:20.830Z',
    user: '614c4e4c714d5bdd740ec771',
    ref: 'hPSkIRAKRsx49nbP_WznA',
    product_ref: 'T8SBBhGY4kt3Ndv8uL6GJ',
    name: 'Double Bull Rice (50KG)',
    id: '61583d6be183420016c1afb7',
  },
  {
    beneficary: {
      address: 'Gbenga Joseph',
      account_number: null,
      bank_code: null,
      country: 'Nigeria',
      phone: '+2347017808188',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Gbenga Joseph',
    },
    state: null,
    quantity: 1,
    amount: 24500,
    image: null,
    meta: null,
    createdAt: '2021-10-01T10:44:20.830Z',
    user: '614c4e4c714d5bdd740ec771',
    ref: 'VGlcKDrrA6uXAxWSXTaBJ',
    product_ref: 'ihRamcODzA4iyJJqtplxa',
    name: 'Royal Stallion Rice (50KG)',
    id: '61583d6be183420016c1afb8',
  },
  {
    beneficary: {
      address: 'Segun',
      account_number: null,
      bank_code: null,
      country: 'NG',
      phone: '080350775',
      zip_code: null,
      currency_code: null,
      transaction_ref: null,
      name: 'Segun',
    },
    state: null,
    quantity: 1,
    amount: 18,
    image: null,
    meta: null,
    createdAt: '2021-10-06T11:22:53.819Z',
    user: '614c9a81171e20001693b95f',
    ref: 't7n36YdTOWSAkazRBqW2R',
    product_ref: 'z_IyRbQgi2khjM8zsQh9f',
    name: 'Tomato King Rice(25KG)',
    id: '615e8b54a3bd280016d4ca4d',
  },
];

const topSellingProducts = [
  {
    name: 'CornFlakes',
    amount: 1000,
    image: '/product.png',
  },
  {
    name: 'CornFlakes',
    amount: 1000,
    image: '/product.png',
  },
  {
    name: 'CornFlakes',
    amount: 1000,
    image: '/product.png',
  },
];

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
  return (
    <Box>
      <Flex justifyContent="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Overview
        </Text>
        <Button color="brand.primary" leftIcon={<FiRefreshCw />}>
          Refresh
        </Button>
      </Flex>

      <Grid
        templateColumns="repeat(4, 1fr)"
        mt={5}
        borderRadius="lg"
        bg="white"
        boxShadow="md"
        px={'32px'}
        py={'35px'}
        gridGap="10"
      >
        <Flex
          borderRight="1px solid"
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
              12,050
            </Text>
          </Box>
        </Flex>

        <Flex
          borderRight="1px solid"
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
          borderRight="1px solid"
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
        templateColumns="repeat(2, 1fr)"
        mt={5}
        borderRadius="lg"
        gridGap="10"
      >
        <Box
          bg="white"
          boxShadow="md"
          px={'32px'}
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

          <Flex justifyContent="space-around" alignItems="center">
            <Box></Box>

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

          <Grid templateColumns="repeat(2, 1fr)" mt="5">
            {topSellingProducts.map(product => (
              <Product data={product} />
            ))}
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
          >
            View all
          </Button>
        </Flex>

        <Box mt="5">
          <ProductsDataTable data={orders.slice(0, 7)} />
        </Box>
      </Box>
    </Box>
  );
}
