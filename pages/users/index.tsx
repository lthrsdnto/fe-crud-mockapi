import {
  Spacer,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Users from "../../components/Users";
import { User } from "../../types";
import { selectAuthState } from "../../store/auth/authSelector";
import { useSelector } from "react-redux";

const Posts: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [users, setUsers] = useState<User[]>(props.users);
  const handleSearch = async (search: string) => {
    const resUsers = await fetch(
      `https://63438d663f83935a78552378.mockapi.io/user?search=${search}`
    );
    setUsers(await resUsers.json());
  };
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  //modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      name: "",
      username: "",
    },
  });

  //create form handler
  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      await fetch("https://63438d663f83935a78552378.mockapi.io/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((data) => {
        if (data.ok) {
          reset();
          onClose();
          router.reload();
        }
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <Box w={"full"} h={"fit-content"}>
        <Flex gap={2}>
          <Button onClick={onOpen} bg={"orange"} fontSize={"2xl"}>
            +
          </Button>
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search"
          />
        </Flex>
        <Divider />
        <List>
          {users.map((user) => (
            <Users name={user.name} username={user.username} id={user.id} />
          ))}
        </List>
      </Box>

      {/* create */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {authState ? (
              <form>
                <VStack spacing={3}>
                  <Input
                    placeholder="Name"
                    {...register("name", {
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
                      placeholder="Username"
                      {...register("username", {
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
              </form>
            ) : (
              <Text color={"red"}>
                You must login first in order to create user.
              </Text>
            )}
          </ModalBody>
          <ModalFooter gap={2}>
            {authState ? (
              <Button bg={"orange"} type="submit">
                Submit
              </Button>
            ) : null}
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resUsers = await fetch(
    "https://63438d663f83935a78552378.mockapi.io/user"
  );
  const users = await resUsers.json();
  return { props: { users: users } };
};

export default Posts;
