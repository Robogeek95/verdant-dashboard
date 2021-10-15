import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton } from '@chakra-ui/button';
import { useFilePicker } from 'use-file-picker';
import {
  FiCheckCircle,
  FiEdit,
  FiMinus,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi';

import { Text, Box, Flex, Image } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';

import { Stack, Grid } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
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
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../redux/actions/categoriesActions';
import { useSelector } from 'react-redux';

export default function CategoryDataTable({ data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const dispatch = useDispatch();
  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
  });

  const categoriesState = useSelector(state => state.categories);
  const { deleteError, deleted, deleting } = categoriesState;

  function onSubmitEditCategory(data) {
    const payload = {
      email: data.email,
      password: data.password,
    };

    console.log(payload);
    // dispatch(login(payload));
  }

  // alert dialog
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setActiveOrder({});
    setIsOpen(false);
  };

  const cancelRef = useRef();

  function handleRemove(order) {
    setActiveOrder(order);
    setIsOpen(true);
  }

  function handleOnSelectRemove() {
    // close the dialog
    onClose();

    // proceed to delete the order
    handleDelete();
  }

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

  // label select
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  const onCloseDeleteProduct = () => setIsDeletedOpen(false);

  function handleDelete() {
    // notify that delete is successful
    dispatch(deleteCategory(activeOrder.id));

    // unset active order
    setActiveOrder({});
  }

  useEffect(() => {
    if (deleted) {
      setIsDeletedOpen(true);
    }
  }, [deleted]);

  const columns = [
    {
      name: 'Category',
      sortable: true,
      cell: row => (
        <Stack direction="row" alignItems="center" my="4">
          <img src={row.image} width="80  " height="80  " alt={row.name} />
          <Text fontSize="lg">{row.category}</Text>
        </Stack>
      ),
    },
    {
      name: 'Total products',
      cell: (row, index) => <Text>{row.sub_categories.length || 'NA'}</Text>,
      sortable: true,
    },
    {
      name: 'Action',
      // selector: row => row.year,
      cell: row => (
        <Stack gap={3} direction="row">
          <Button
            onClick={() => handleView(row)}
            colorScheme="blue"
            variant="ghost"
          >
            <Box as="span" mr={3}>
              <FiEdit />
            </Box>
            Edit
          </Button>
          <Button
            onClick={() => handleRemove(row)}
            colorScheme="red"
            variant="ghost"
          >
            <Box as="span" mr={3}>
              <FiTrash2 />
            </Box>
            Remove
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} pagination />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove {activeOrder.name} from List?
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

      <Drawer
        size="md"
        isOpen={isProductOpen}
        placement="right"
        onClose={onCloseProduct}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Category</DrawerHeader>

          <DrawerBody>
            <Box>
              <Stack spacing="1">
                <Text fontSize="xl">Category Information</Text>

                <Text fontSize="md" fontWeight="light" color="gray.600">
                  Fill all details below
                </Text>
              </Stack>

              <Divider my={5} />

              <Box>
                <Stack
                  as="form"
                  onSubmit={handleSubmit(onSubmitEditCategory)}
                  spacing={4}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing="5"
                  >
                    <FormControl id="email">
                      <FormLabel>Category name</FormLabel>
                      <Input
                        {...register('name', { required: true })}
                        type="text"
                        placeholder="Enter category name"
                      />
                      {errors.email?.type === 'required' && (
                        <Text color="red.500" fontSize="xs" mt="2">
                          Category name is required
                        </Text>
                      )}
                    </FormControl>

                    <FormControl id="password">
                      <FormLabel>Sub- Category</FormLabel>
                      <Stack direction="row">
                        <Input
                          {...register('sub', {
                            required: true,
                            minLength: 6,
                          })}
                          type="number"
                          placeholder="Enter subcategory to add"
                        />

                        <Box>
                          <IconButton color="blue" icon={<FiPlus />} />
                        </Box>
                      </Stack>
                    </FormControl>
                  </Stack>

                  <FormControl id="password">
                    <FormLabel>Details - List of Sub - Category</FormLabel>
                    <Grid
                      templateColumns="repeat(2, 1fr)"
                      gridGap="3"
                      borderRadius="lg"
                      p="5"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="gray.200"
                    >
                      {activeOrder?.sub_categories?.map(sub => (
                        <Stack direction="row" alignItems="center">
                          <IconButton color="red" icon={<FiTrash2 />} />

                          <Text color="gray.500">{sub.name}</Text>
                        </Stack>
                      ))}
                    </Grid>
                  </FormControl>

                  <Box position="relative">
                    <Flex top={5} right={5} position="absolute">
                      <IconButton
                        color="red"
                        icon={<FiTrash2 />}
                        onClick={() => clear()}
                      />
                    </Flex>
                    <Box
                      height="144px"
                      borderRadius="lg"
                      border="1px solid"
                      borderStyle="dashed"
                      bg={`url(${filesContent[0]?.content})`}
                      backgroundPosition="center"
                      cursor="pointer"
                      bgSize="cover"
                      _hover={{
                        bg: 'gray.100',
                      }}
                      p={5}
                      onClick={() => openFileSelector()}
                    ></Box>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onCloseProduct}>
              Close
            </Button>
            <Button colorScheme="blue">Save changes</Button>
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
