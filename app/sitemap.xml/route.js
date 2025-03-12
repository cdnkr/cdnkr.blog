import config from "@/config";
import { getAllPosts } from "@/utils/mdx";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${posts
      .map(
        (post) =>
          `<url>
        <loc>${config.url}/${post.slug}</loc>
        <lastmod>${new Date(post.frontmatter.date).toISOString()}</lastmod>
    </url>`,
      )
      .join("")}
    <url>
      <loc>${config.url}/about/blog</loc>
      <lastmod>${new Date("2025-03-12").toISOString()}</lastmod>
    </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
