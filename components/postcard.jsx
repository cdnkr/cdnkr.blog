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
        className={cn(className, "flex flex-col gap-2 group relative")}
      >
        <span className="text-dark leading-none absolute -top-3 inline-block bg-background px-3">
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
        <div className="w-full group">
          <h3 className="text-2xl lg:text-4xl max-w-xl text-wrap break-words font-libre-franklin">
            <span className="font-bold">{frontmatter.title}</span>
          </h3>
        </div>
        <div className="w-full flex items-center flex-wrap gap-2">
          {frontmatter?.tags?.map((tag, i) => (
            <Tag key={tag + i}>{tag}</Tag>
          ))}
        </div>
        <p>{frontmatter.description}</p>
      </Card>
    </Link>
  );
}
