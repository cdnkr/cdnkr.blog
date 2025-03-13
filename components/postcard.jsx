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
        className={cn(className, "flex flex-row-reverse gap-0 group relative p-0")}
      >
        <span className="leading-none absolute -top-4 left-0 inline-block bg-background px-3">
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
        <div className={`w-12 shrink-0 text-primary bg-secondary/20 ${post.pattern}`} />

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

export function PostCard_2({ post, className }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/post/${slug}`}>
      <div
        id={encodeURIComponent(frontmatter.title)}
        className={cn(className, "flex flex-row-reverse lg:flex-row gap-0 group relative p-0 border-b-2 border-dark my-8")}
      >
        <span className="leading-none absolute -top-4 inline-block bg-background px-3">
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
        <div className={`w-12 lg:w-48 m-4 shrink-0 bg-secondary/20 text-primary ${post.pattern}`} />
      </div>
    </Link>
  );
}

export function PostCard_Main({ post, className }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/post/${slug}`}>
      <div
        id={encodeURIComponent(frontmatter.title)}
        className={cn(className, "flex flex-col gap-0 group relative p-0 border-b-2 border-dark")}
      >
        <div className={`w-full h-72 m-4 mt-0 shrink-0 bg-secondary/20 text-primary ${post.pattern}`} />
        <span className="leading-none inline-block bg-background px-3">
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
      </div>
    </Link>
  );
}
