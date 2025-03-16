import MDX from "@/components/mdx";
import Link from "next/link";
import PostSectionNav from "./postsectionnav";
import Button from "./ui/button";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./ui/icons";
import Tag from "./ui/tag";
import { cn } from "@/utils/cn";
import ShareButton from "./share";

export default function Post({ post, layout = "default" }) {
  const { frontmatter } = post;

  return (
    <div className="w-full flex flex-col gap-6 lg:gap-6 mt-8">
      {frontmatter?.tags && (
        <div className="w-full flex justify-center items-center flex-wrap gap-2">
          {frontmatter?.tags?.map((tag, i) => (
            <Tag key={tag + i}>{tag}</Tag>
          ))}
        </div>
      )}
      <div className="w-full flex flex-col gap-8">
        <div className={cn(
          "relative w-full flex flex-col justify-center min-h-[357px] lg:min-h-[360px] gap-4 py-24 lg:py-8 px-4 lg:px-0 text-primary", post.pattern, layout === "full" ? "lg:py-24" : ""
        )}>
          <div className={cn(
            "w-full flex flex-col justify-center items-center"
          )}>
            <h3 className={cn(
              "text-2xl lg:text-4xl max-w-xl text-wrap break-words font-libre-franklin",
              "text-center text-3xl lg:text-5xl"
            )}>
              <span className="text-text-title bg-title-text-bg uppercase font-bold leading-snug">
                {frontmatter.title}
              </span>
            </h3>
            <div className="mt-[3px] w-full flex justify-center">
              <time
                dateTime={frontmatter.date}
                className="font-mono text-xs bg-title-text-bg text-text-title px-2 py-1"
              >
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 relative">
          <article className={
            cn(
              "w-full flex flex-col gap-8",
              layout === "full" ? "lg:col-span-12" : "lg:col-span-8"
            )}>
            {post.sections.map((section, i) => (
              <div
                key={i}
                id={encodeURIComponent(post.sectionTitles[i].replace(/#/g, ""))}
                className={
                  cn(
                    "w-full",
                    layout === "full" ? "flex justify-center" : ""
                  )}
              >
                <MDX source={section} layout={layout} />
              </div>
            ))}
          </article>
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:pt-1">
            <ShareButton />
            <PostSectionNav
              sectionTitles={post.sectionTitles}
              className={cn(
                "hidden lg:block",
                layout === "full" ? "lg:hidden" : "lg:col-span-4"
              )}
            />
          </div>
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-4 lg:gap-8 mt-8">
          {post?.previous ? (
            <Link href={post.previous?.slug}>
              <Button className="gap-3 w-full lg:w-auto lg:max-w-72 px-4">
                <ArrowLeft className="shrink-0" />
                <span className="truncate">
                  {post.previous?.frontmatter?.title}
                </span>
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {post?.next && (
            <Link href={post.next?.slug}>
              <Button className="gap-3 w-full lg:w-auto lg:max-w-72 px-4">
                <span className="truncate">
                  {post.next?.frontmatter?.title}
                </span>
                <ArrowRight className="shrink-0" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
