import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function getAllPosts() {
  try {
    const postsDirectory = path.join(process.cwd(), "content/posts");
    const files = fs.readdirSync(postsDirectory);
    
    const posts = files.map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");
      
      const { data: frontmatter, content } = matter(fileContent);
      const slug = fileName.replace(/\.mdx$/, "");

      const sectionTitles = content.split("---").map(section => section.trim().split("\n")[0]);

      return {
        slug,
        frontmatter,
        content,
        sections: content.split("---"),
        sectionTitles,
      }
    });

    posts.forEach((post, index) => {
      post.previous = posts[index - 1];
      post.next = posts[index + 1];
    });
    
    // sort posts by date
    const sortedPosts = posts.sort((a, b) => {
      if (!a.frontmatter?.date || !b.frontmatter?.date) return 0
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
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
