import React, { useState } from 'react';
import { Button, IconButton } from '@chakra-ui/button';
import { FiCheckCircle, FiMinus, FiMoreVertical, FiPlus } from 'react-icons/fi';

import { Text, Box, Flex, Image } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
  Stack,
  Grid,
} from '@chakra-ui/react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';

export default function UsersDataTable({ data = [] }) {
  // product drawer
  const [isProductOpen, setIsProductOpen] = useState(false);
  const onCloseProduct = () => {
    setActiveOrder({});
    setIsProductOpen(false);
  };

  function handleView(order) {
    setActiveOrder(order);
    setIsProductOpen(true);
  }

  // label select
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  function handleToggleLabel() {
    setIsLabelOpen(!isLabelOpen);
  }

  const [activeOrder, setActiveOrder] = useState({});

  function formatStateBtn(state) {
    if (state === 'active') {
      return (
        <Button colorScheme="green" variant="outline">
          Active
        </Button>
      );
    } else {
      return (
        <Button colorScheme="red" variant="outline">
          Deactivated
        </Button>
      );
    }
  }

  // label select
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  const onCloseDeleteProduct = () => setIsDeletedOpen(false);

  const columns = [
    {
      name: 'Full name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email Address',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Billing Address',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Status',
      // selector: row => row.year,
      cell: (row, index) => formatStateBtn(row.state || 'pending'),
      sortable: true,
    },
    {
      name: 'Status',
      // selector: row => row.year,
      cell: (row, index) => (
        <Popover w="150px">
          <PopoverTrigger>
            <IconButton variant="ghost" icon={<FiMoreVertical />} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverBody>
                <Stack gap={3}>
                  <Button
                    onClick={() => handleView(row)}
                    colorScheme="blue"
                    variant="ghost"
                  >
                    View
                  </Button>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} pagination />

      <Drawer isOpen={isProductOpen} placement="right" onClose={onCloseProduct}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>User Details</DrawerHeader>

          <DrawerBody>
            <Box>
              <Box>
                <Image
                  src={activeOrder.image}
                  h="90px"
                  alt={activeOrder.name}
                  mb={4}
                />

                <Text fontSize="xl">{activeOrder.name}</Text>
                <Text fontSize="lg" color="brand.primary">
                  {activeOrder.email}
                </Text>
              </Box>
              <Box mt={3}>
                <Text fontWeight="bold">Labels</Text>

                {/* labels */}
                <Stack direction="row" mb={4} alignItems="center">
                  <IconButton
                    onClick={handleToggleLabel}
                    icon={isLabelOpen ? <FiMinus /> : <FiPlus />}
                  />

                  {formatStateBtn(activeOrder.state)}
                </Stack>

                {isLabelOpen && (
                  <Grid
                    gap={2}
                    templateColumns="repeat(3, auto)"
                    bg="gray.200"
                    p="3"
                    borderRadius="lg"
                  >
                    <Button colorScheme="green" variant="outline">
                      Activate
                    </Button>
                    <Button colorScheme="red" variant="outline">
                      Deactivated
                    </Button>
                  </Grid>
                )}
              </Box>

              <Divider my={5} />
              <Flex justifyContent="space-between">
                <Text>Phone number:</Text>
                <Text>{activeOrder.phone}</Text>
              </Flex>

              <Divider my={5} />
              <Flex justifyContent="space-between">
                <Text>Billing Address:</Text>
                <Text>{activeOrder.address}</Text>
              </Flex>

              <Divider my={5} />
              <Flex justifyContent="space-between">
                <Text>Sex:</Text>
                <Text>{activeOrder.sex}</Text>
              </Flex>

              <Box></Box>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onCloseProduct}>
              Close
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Modal isOpen={isDeletedOpen} onClose={onCloseDeleteProduct}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <Stack p="5" justifyContent="center" alignItems="center">
            <FiCheckCircle size="35" color="green" />
            <ModalBody>Order successfully removed from list!!</ModalBody>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
}
