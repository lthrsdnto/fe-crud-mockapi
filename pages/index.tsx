import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { selectAuthState } from "../store/auth/authSelector";

const Home: NextPage = () => {
  const authState = useSelector(selectAuthState);
  return (
    <Box w={"full"}>
      <Heading
        bg={"blackAlpha.400"}
        textAlign={"right"}
        padding={4}
        borderRadius={"md"}
      >
        {" "}
        {authState ? "Logged in" : "Not Logged In"}
      </Heading>
    </Box>
  );
};

export default Home;
