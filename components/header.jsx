import { cn } from "@/utils/cn";
import Link from "next/link";
import config from "../config";

export default function Header({ className }) {
  const [titlePart, titleSecondaryPart] = config.title.split(/\.|\s|-/g);

  return (
    <div className={cn("w-full flex flex-col gap-4 relative", className)}>
      <div className="w-full flex gap-8 lg:gap-0 justify-center items-start mb-0 border-b-2 border-muted pb-8">
        <Link href="/">
          <h1 className="text-6xl lg:text-[10rem] text-dark uppercase font-oswald font-black tracking-tight leading-none transition-all duration-300 [text-shadow:2px_1px_0_var(--color-background),_5px_4px_0_var(--color-dark)] active:[text-shadow:1px_0px_0_var(--color-background),_3px_2px_0_var(--color-dark)]">
            {titlePart}
            {"."}
            {titleSecondaryPart}
          </h1>
        </Link>
      </div>
    </div>
  );
}
