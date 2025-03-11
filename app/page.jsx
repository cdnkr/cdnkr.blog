import Home from "@/components/home";
import config from "@/config";
import { getAllPosts, getTags } from "@/utils/mdx";

export async function generateMetadata() {
  return {
    title: config.title,
    keywords: config.keywords,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      keywords: config.keywords,
      images: [
        {
          url: `${config.url}/${config.image}`,
        },
      ],
      siteName: config.title,
      url: config.url,
    },
  };
}

export default async function HomePage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getTags()]);

  return <Home posts={posts} tags={tags} />;
}
