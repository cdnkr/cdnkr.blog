import { cn } from "@/utils/cn";
import Link from "next/link";
import Card from "./ui/card";
import { ChevronDoubleRight } from "./ui/icons";

export default function PostCard({ post, className }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/post/${slug}`}>
      <Card
        id={encodeURIComponent(frontmatter.title)}
        className={cn(className, "flex flex-col gap-4 group")}
      >
        <div className="w-full group">
          <h3 className="text-4xl max-w-full leading-snug text-wrap break-words font-black group-hover:text-primary transition-all duration-300">
            {frontmatter.title}
            <ChevronDoubleRight
              strokeWidth={3}
              className="ml-4 inline-block transition-all duration-300 opacity-0 group-hover:opacity-100 size-6 lg:size-6 stroke-primary"
            />
          </h3>
        </div>
        <div className="w-full flex items-center flex-wrap gap-2">
          <span className="text-gray-600 leading-none">
            {frontmatter.date && (
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            )}
          </span>
          {frontmatter?.tags?.map((tag, i) => (
            <span
              key={tag + i}
              className="text-sm uppercase text-primary font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
        <p>{frontmatter.description}</p>
      </Card>
    </Link>
  );
}
