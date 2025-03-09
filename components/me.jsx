import { cn } from "@/utils/cn";
import Popover from "./ui/popover";
import Button from "./ui/button";

export default function Me({ className }) {
    return (
        <Popover
            popoverContent={
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl leading-none text-black uppercase font-oswald font-black tracking-tight relative -top-1.5">
                        "I'm a front-end developer, based in South Africa. I <span className="text-7xl leading-[0]">♥</span> building great-looking, functional websites. I'm passionate about pretty much every f*cking thing JavaScript, design or front-end related."
                    </h1>
                    <div className="flex lg:hidden flex-col gap-3 w-full">
                        <a
                            href="https://github.com/cdnkr"
                            className="w-full uppercase text-white text-xs hover:text-tertiary transition-all duration-300"
                        >
                            <Button className="w-full text-lg">
                                github.com/cdnkr
                            </Button>
                        </a>
                        <a
                            href="https://linkedin.com/in/cdnkr"
                            className="w-full uppercase text-white text-xs hover:text-tertiary transition-all duration-300"
                        >
                            <Button className="w-full text-lg">
                                linkedin.com/in/cdnkr
                            </Button>
                        </a>
                    </div>
                </div>
            }
        >
            <span className={cn("uppercase text-white text-xs hover:text-tertiary transition-all duration-300", className)}>about me</span>
        </Popover>
    )
}
