import {
  Text,
  ListItem,
  Flex,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  InputGroup,
  InputLeftAddon,
  ModalFooter,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../types";

const Users: React.FC<any> = ({ name, username, id }) => {
  const isUpdate = useDisclosure();
  const isDelete = useDisclosure();
  const updateForm = useForm<any>();
  const deleteForm = useForm<any>();
  const router = useRouter();

  //update form handler
  const onUpdate: SubmitHandler<User> = async (data) => {
    try {
      await fetch(`https://63438d663f83935a78552378.mockapi.io/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((data) => {
        if (data.ok) {
          updateForm.reset();
          isUpdate.onClose();
          router.reload();
        }
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  //delete form handler
  const onDelete: SubmitHandler<User> = async (data) => {
    try {
      await fetch(`https://63438d663f83935a78552378.mockapi.io/user/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((data) => {
        if (data.ok) {
          deleteForm.reset();
          isDelete.onClose();
          router.reload();
        }
        Router.push("/users");
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <ListItem key={id}>
        {/* <Link href={`/users/${id}`}> */}

        <Flex
          borderColor={"indigo"}
          borderWidth={2}
          borderRadius={"xl"}
          m={2}
          p={4}
          alignItems={"center"}
          gap={2}
        >
          <Text>
            {name}
            {""}
          </Text>
          <Text as={"small"} color={"orange"}>
            @{username}
          </Text>
          <Spacer />

          <Button onClick={isUpdate.onOpen} bg={"yellow"} fontSize={"sm"}>
            Edit
          </Button>
          <Button onClick={isDelete.onOpen} bg={"red"} fontSize={"sm"}>
            X
          </Button>
        </Flex>

        {/* </Link> */}
        {/* update */}
        <Modal isOpen={isUpdate.isOpen} onClose={isUpdate.onClose}>
          <ModalOverlay />
          <ModalContent
            as={"form"}
            onSubmit={updateForm.handleSubmit(onUpdate)}
          >
            <ModalHeader>Update User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={3}>
                <Input
                  type="hidden"
                  value={id}
                  {...updateForm.register("id", { required: true })}
                />
                <Input
                  placeholder={name}
                  {...updateForm.register("name", {
                    required: true,
                    pattern: /[A-Za-z]{3}/,
                    max: {
                      value: 3,
                      message: "error message",
                    },
                  })}
                />
                <InputGroup>
                  <InputLeftAddon children={"@"} />
                  <Input
                    placeholder={username}
                    {...updateForm.register("username", {
                      required: true,
                      pattern: /[A-Za-z]{3}/,
                      max: {
                        value: 3,
                        message: "error message",
                      },
                    })}
                  />
                </InputGroup>
              </VStack>
            </ModalBody>
            <ModalFooter gap={2}>
              <Button bg={"orange"} type="submit">
                Submit
              </Button>
              <Button onClick={isUpdate.onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* delete */}
        <Modal isOpen={isDelete.isOpen} onClose={isDelete.onClose}>
          <ModalOverlay />
          <ModalContent
            as={"form"}
            onSubmit={deleteForm.handleSubmit(onDelete)}
          >
            <ModalHeader color={"red"}>!!!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={3}>
                <Text>
                  Delete <Badge colorScheme="red">"{name}"</Badge> in the list?
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter gap={2}>
              <Button bg={"orange"} type="submit">
                Confirm
              </Button>
              <Button onClick={isDelete.onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ListItem>
    </>
  );
};
export default Users;
