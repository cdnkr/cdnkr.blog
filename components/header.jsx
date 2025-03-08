import { cn } from "@/utils/cn";
import Link from "next/link";
import config from "../config";
import ShareButton from "./share";

export default function Header({ className }) {
  const [titlePart, titleSecondaryPart] = config.title.split(/\.|\s|-/g);

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-4 rounded-lg relative",
        className,
      )}
    >
      <div className="w-full flex gap-8 lg:gap-0 justify-between items-start mb-0 border-b-2 border-dark pb-6">
        <Link href="/">
          <h1 className="text-5xl lg:text-7xl text-black uppercase font-oswald font-black tracking-tight leading-none transition-all duration-300 hover:[text-shadow:2px_1px_0_var(--color-background),_5px_4px_0_var(--color-primary)] active:[text-shadow:1px_0px_0_var(--color-background),_3px_2px_0_var(--color-primary)]">
            <span className="uppercase">{titlePart}</span>
            <span className="text-black">.</span>
            <br />
            <span className="uppercase">{titleSecondaryPart}</span>
          </h1>
        </Link>
        <ShareButton />
      </div>
    </div>
  );
}
