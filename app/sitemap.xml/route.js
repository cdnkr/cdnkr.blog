import config from "@/config";
import { getAllPosts } from "@/utils/mdx";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${config.url}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${posts
      .map(
        (post) =>
          `<url>
        <loc>${config.url}/post/${post.slug}</loc>
        <lastmod>${new Date(post.frontmatter.date).toISOString()}</lastmod>
    </url>`,
      )
      .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
