import Post from "@/components/post";
import config from "@/config";
import { getAboutPost, getAllPosts } from "@/utils/mdx";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata() {
  const post = await getAboutPost();

  return {
    title: post.frontmatter.title,
    keywords: config.keywords,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [
        {
          url: `${config.url}/${config.image}`,
        },
      ],
      keywords: config.keywords,
      siteName: config.title,
      url: `${config.url}/about/blog`,
    },
  };
}

export default async function BlogPost({ params }) {
  try {
    params = await params;
    const post = await getAboutPost();

    return <Post post={post} layout="full" />;
  } catch (error) {
    console.error("Error loading post:", error);
    return <div>Error loading post: {error.message}</div>;
  }
}
