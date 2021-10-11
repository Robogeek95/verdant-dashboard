import React, { useEffect, useState } from 'react';
import { Box, Divider, Stack, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import UsersDataTable from './UsersDataTable';

const users = [
  {
    name: 'Fin Taylor',
    email: 'fin.taylor@gmail.com',
    address: 'Ojodu, berger',
    phone: '+23410112324',
    state: 'active',
    sex: 'male',
    isAdmin: true,
  },
  {
    name: 'Fin Taylor',
    email: 'fin.taylor@gmail.com',
    address: 'Ojodu, berger',
    phone: '+23410112324',
    state: 'active',
    sex: 'female',
    isAdmin: false,
  },
  {
    name: 'Fin Taylor',
    email: 'fin.taylor@gmail.com',
    address: 'Ojodu, berger',
    phone: '+23410112324',
    state: 'deactivated',
    sex: 'male',
    isAdmin: true,
  },
  {
    name: 'Fin Taylor',
    email: 'fin.taylor@gmail.com',
    address: 'Ojodu, berger',
    phone: '+23410112324',
    state: 'active',
    sex: 'female',
    isAdmin: false,
  },
  {
    name: 'Fin Taylor',
    email: 'fin.taylor@gmail.com',
    address: 'Ojodu, berger',
    phone: '+23410112324',
    state: 'deactivated',
    sex: 'female',
    isAdmin: false,
  },
];

export default function UsersDashboard() {
  const [tab, setTab] = useState('customer');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (tab === 'customer') {
      setFilteredUsers(users.filter(user => !user.isAdmin));
    } else {
      setFilteredUsers(users.filter(user => user.isAdmin));
    }
  }, [tab]);

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" p={5}>
        Users
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
                onClick={() => setTab('customer')}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" color="gray.500">
                  Customer List
                </Text>

                <Box
                  w="120px"
                  position="absolute"
                  bg={tab === 'customer' ? 'brand.primary' : 'transparent'}
                  h="3px"
                  borderRadius="xl"
                  bottom="-4"
                />
              </Stack>

              <Stack
                onClick={() => setTab('staff')}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" color="gray.500">
                  Staff List
                </Text>

                <Box
                  w="120px"
                  position="absolute"
                  bg={tab === 'staff' ? 'brand.primary' : 'transparent'}
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

        <Box p={10}>
          <UsersDataTable data={filteredUsers} />
        </Box>
      </Box>
    </Box>
  );
}
