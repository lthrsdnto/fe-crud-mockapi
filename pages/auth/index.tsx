import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthState,
  setIncrement,
  setDecrement,
} from "../../store/auth/authSlice";
import { selectAuthState } from "../../store/auth/authSelector";
import { selectCounter } from "../../store/auth/authSelector";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

const Auth: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();
  return (
    <Box>
      <Heading
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
      <br />
      <Flex alignItems={"center"} padding={2}>
        <Button onClick={() => dispatch(setIncrement(counter))}>+</Button>
        <Heading margin={2}>{counter}</Heading>
        <Button onClick={() => dispatch(setDecrement(counter))}>-</Button>
      </Flex>
    </Box>
  );
};

export default Auth;
