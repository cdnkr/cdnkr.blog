import Home from "@/components/home";
import { getAllPosts, getTags } from "@/utils/mdx";

export default async function HomePage() {
  const posts = await getAllPosts();
  const tags = await getTags(posts);

  return <Home posts={posts} tags={tags} />;
}
