import { cn } from "@/utils/cn";
import Link from "next/link";
import config from "../config";

export default function Header({ className }) {
  const [titlePart, titleSecondaryPart] = config.title.split(/\.|\s|-/g);

  return (
    <div className={cn("w-full flex flex-col gap-4 rounded-lg", className)}>
      <div className="w-full flex gap-8 lg:gap-0 justify-between items-center mb-0">
        <Link href="/">
          <h1 className="text-4xl lg:text-6xl uppercase font-black">
            <span className="mr-3">{titlePart}</span>
            <span className="underline decoration-wavy decoration-primary underline-offset-[8px]">
              {titleSecondaryPart}
            </span>
          </h1>
        </Link>
      </div>
    </div>
  );
}
