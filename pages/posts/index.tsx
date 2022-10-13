import { Box, Button, List, ListItem, Select } from "@chakra-ui/react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import router from "next/router";
import { Post } from "../../types";

const Posts: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const posts: Post[] = props.data;
  const onSelect = (value: number) => {
    const id = posts.findIndex((post) => post.id === value);
    console.log(id);
    router.push(`/posts/${id + 1}`);
  };

  return (
    <Box w={"full"} h={"fit-content"}>
      <Select
        bg="tomato"
        borderColor="tomato"
        placeholder="Select a post"
        id="option"
        onChange={(e) => {
          onSelect(parseInt(e.target.value));
        }}
      >
        {posts.map((post) => (
          <option key={post.id} value={post.id}>
            {post.id} - {post.title}
          </option>
        ))}
      </Select>
      {/* <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            {post.id} - <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return { props: { data: data } };
};

export default Posts;
