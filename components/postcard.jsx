import { cn } from "@/utils/cn";
import Link from "next/link";
import Card from "./ui/card";
import Tag from "./ui/tag";

export default function PostCard({ post, className }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/post/${slug}`}>
      <Card
        id={encodeURIComponent(frontmatter.title)}
        className={cn(className, "flex gap-0 group relative p-0")}
      >
        <span className="text-white leading-none absolute -top-4 -left-2 inline-block bg-dark transform -rotate-1 px-3">
          {frontmatter.date && (
            <time
              dateTime={frontmatter.date}
              className="font-gochi-hand text-xl"
            >
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          )}
        </span>
        <div className={`h-auto w-12 lg:w-44 aspect-square shrink-0 bg-background text-secondary ${post.pattern}`} />
        <div className="w-full flex flex-col gap-2 p-4">
          <div className="w-full group">
            <h3 className="text-2xl lg:text-4xl max-w-xl text-wrap break-words font-libre-franklin">
              <span className="font-bold">{frontmatter.title}</span>
            </h3>
          </div>
          <p>{frontmatter.description}</p>
          <div className="w-full flex items-center flex-wrap gap-2">
            {frontmatter?.tags?.map((tag, i) => (
              <Tag key={tag + i}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
