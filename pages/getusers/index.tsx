import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { getUserDetails } from "../../store/user/userAction";
import { selectUser } from "../../store/user/userSelector";
import { useEffect } from "react";
import { AppDispatch } from "../../store/store";
import { selectAuthState } from "../../store/auth/authSelector";

const People: NextPage = () => {
  const users = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(getUserDetails());
  //   console.log(getUserDetails());
  // }, []);
  const authState = useSelector(selectAuthState);
  return (
    <Box>
      {/* <Heading
        bg={"blackAlpha.400"}
        textAlign={"right"}
        padding={4}
        borderRadius={"md"}
      >
        {" "}
        {authState ? "Logged in" : "Not Logged In"}
      </Heading>
      <Button
        marginTop={"3"}
        onClick={() => dispatch(setAuthState(!authState))}
      >
        {authState ? "Logout" : "Login"}
      </Button>
      <br /> */}
      <Heading
        bg={"blackAlpha.400"}
        textAlign={"right"}
        padding={4}
        borderRadius={"md"}
      >
        {" "}
        {authState ? "Logged in" : "Not Logged In"}
      </Heading>
      <Button marginTop={4} onClick={() => dispatch(getUserDetails())}>
        Get Users
      </Button>
      {authState ? (
        <List>
          {users.map((user) => (
            <ListItem>
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
                  {user.name}
                  {""}
                </Text>
                <Text as={"small"} color={"orange"}>
                  @{user.username}
                </Text>
              </Flex>
            </ListItem>
          ))}
        </List>
      ) : (
        <Text color={"red"} padding={2}>
          You need to Login first.
        </Text>
      )}
    </Box>
  );
};

export default People;
