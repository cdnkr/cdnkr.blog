import { cn } from "@/utils/cn";
import Link from "next/link";
import Card from "./ui/card";

export default function PostCard({ post, className, isActive, ...rest }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/post/${slug}`}>
      <Card
        id={encodeURIComponent(frontmatter.title)}
        className={cn(className, "group flex flex-col items-center gap-2 group relative text-dark/70 hover:text-primary transition-all duration-300 px-4 lg:px-0 py-24 lg:py-12", isActive && "text-primary lg:text-dark/70", post.pattern)}
        {...rest}
      >
        <h3 className="text-center font-bold uppercase text-gray-800 transition-all duration-300 hover:text-dark leading-snug text-3xl lg:text-5xl max-w-xl text-wrap break-words font-libre-franklin">
          <span className="bg-dark text-white">{frontmatter.title}</span>
        </h3>
      </Card>
    </Link>
  );
}
