import fs from "fs";
import path from "path";
import matter from "gray-matter";
import getPattern from "./pattern";

export async function getAllPosts(directory = "posts") {
  try {
    const postsDirectory = path.join(process.cwd(), `content/${directory}`);
    const files = fs.readdirSync(postsDirectory);

    let posts = files.map((fileName, index) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");

      const { data: frontmatter, content } = matter(fileContent);
      const slug = fileName.replace(/\.mdx$/, "");

      const sectionTitles = content
        .split("---")
        .map((section) => section.trim().split("\n")[0]);

      const pattern = getPattern(index);
      return {
        slug,
        frontmatter,
        content,
        sections: content.split("---"),
        sectionTitles,
        pattern,
      };
    });

    posts = posts.filter((post) => !post.frontmatter?.archived);

    posts.forEach((post, index) => {
      post.previous = posts[index - 1];
      post.next = posts[index + 1];
    });

    // sort posts by date
    const sortedPosts = posts.sort((a, b) => {
      if (!a.frontmatter?.date || !b.frontmatter?.date) return 0;
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

    return sortedPosts;
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getTags(posts) {
  if (!posts) {
    posts = await getAllPosts();
  }

  const allTags = posts.map((post) => post.frontmatter?.tags).flat();
  const tags = [...new Set(allTags)];

  return tags;
}

export async function getAboutPost() {
  const posts = await getAllPosts("about");
  return { ...posts?.[0], pattern: getPattern(0) };
}
