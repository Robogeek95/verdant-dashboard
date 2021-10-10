import React, { useRef, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

export default function ProductsDataTable({ data }) {
  // alert dialog
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  function handleRemove() {
    setIsOpen(true);
  }

  function handleOnSelectRemove() {
    onClose();
    handleDelete();
  }

  // product drawer
  const [isProductOpen, setIsProductOpen] = useState(false);
  const onCloseProduct = () => setIsProductOpen(false);

  function handleView() {
    setIsProductOpen(true);
  }

  // label select
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  function handleToggleLabel() {
    setIsLabelOpen(!isLabelOpen);
  }

  function formatStateBtn(state) {
    if (state === 'delivered') {
      return (
        <Button colorScheme="yellow" variant="outline">
          Delivered
        </Button>
      );
    } else if (state === 'in-transit') {
      return (
        <Button colorScheme="blue" variant="outline">
          In-transit
        </Button>
      );
    } else {
      return (
        <Button colorScheme="green" variant="outline">
          Pending
        </Button>
      );
    }
  }

  // label select
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  const onCloseDeleteProduct = () => setIsDeletedOpen(false);

  function handleDelete() {
    setIsDeletedOpen(true);
  }

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Name</Th>
            <Th>Order date</Th>
            <Th>No of items</Th>
            <Th>Order status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(order => (
            <Tr>
              <Td>{order.id}</Td>
              <Td>{order.name}</Td>
              <Td>{order.createdAt}</Td>
              <Td>{order.quantity}</Td>
              <Td>{formatStateBtn(order.state || 'pending')}</Td>
              <Td>
                <Popover w="150px">
                  <PopoverTrigger>
                    <IconButton variant="ghost" icon={<FiMoreVertical />} />
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverBody>
                        <Stack gap={3}>
                          <Button
                            onClick={handleView}
                            colorScheme="blue"
                            variant="ghost"
                          >
                            View
                          </Button>
                          <Button
                            onClick={handleRemove}
                            colorScheme="red"
                            variant="ghost"
                          >
                            Remove
                          </Button>
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Order from List?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                variant="blue"
                bg="brand.primary"
                onClick={handleOnSelectRemove}
                color="white"
              >
                Yes please
              </Button>
              <Button
                borderColor="brand.primary"
                ref={cancelRef}
                variant="outline"
                onClick={onClose}
                color="brand.primary"
                ml={3}
              >
                Go Back
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Drawer isOpen={isProductOpen} placement="right" onClose={onCloseProduct}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Order Details</DrawerHeader>

          <DrawerBody>
            <Box>
              <Flex justifyContent="space-between">
                <Text>OrderId</Text>

                <Text>212242sss2345</Text>
              </Flex>
              <Box mt={3}>
                <Text fontWeight="bold">Labels</Text>

                {/* labels */}
                <Stack direction="row" mb={4} alignItems="center">
                  <IconButton
                    onClick={handleToggleLabel}
                    icon={isLabelOpen ? <FiMinus /> : <FiPlus />}
                  />

                  {formatStateBtn('pending')}
                </Stack>

                {isLabelOpen && (
                  <Grid
                    gap={2}
                    templateColumns="repeat(3, 1fr)"
                    bg="gray.200"
                    p="3"
                    borderRadius="lg"
                  >
                    <Button colorScheme="green" variant="outline">
                      Pending
                    </Button>
                    <Button colorScheme="blue" variant="outline">
                      In-transit
                    </Button>
                    <Button colorScheme="yellow" variant="outline">
                      Delivered
                    </Button>
                  </Grid>
                )}
              </Box>

              <Divider my={5} />

              <Box>
                <Flex justifyContent="space-between" mb="4">
                  <Text fontSize="lg">Product Details</Text>
                  <Text fontSize="lg">Price</Text>
                </Flex>

                <Flex
                  mb="4"
                  justifyContent="space-between"
                  gridGap="5"
                  alignItems="center"
                >
                  <Flex gridGap="5" alignItems="center">
                    <Image src="/product.png" h="70px" />
                    <Text>Product name</Text>
                  </Flex>
                  <Text>N1000</Text>
                </Flex>
              </Box>

              <Divider my={5} />
              <Flex justifyContent="space-between">
                <Text>Sum Total:</Text>
                <Text>N 3,000</Text>
              </Flex>

              <Divider my={5} />
              <Flex justifyContent="space-between">
                <Text>Delivery:</Text>
                <Text>N 3,000</Text>
              </Flex>

              <Divider my={5} />
              <Flex justifyContent="space-between">
                <Text>TOTAL:</Text>
                <Text>N 3,000</Text>
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
