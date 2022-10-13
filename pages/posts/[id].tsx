import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { Comment } from "../../types";

const Thread: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const comments: Comment[] = props.comments;
  const router = useRouter();
  const { id } = router.query;
  return (
    <Box>
      <List>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Comments of the post: {id}
        </Text>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <Box p={4}>
              <Text>#{comment.id}</Text>
              <Heading>{comment.name}</Heading>
              <Text fontSize={"sm"} color={"orange"}>
                {comment.email}
              </Text>
              <Text fontSize={"xl"}>{comment.body}</Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const resPost = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  const comments = await resPost.json();
  return { props: { comments: comments } };
};

export default Thread;
