import { cn } from "@/utils/cn";

export default function Card({ children, id, className }) {
    return (
        <div id={id} className={cn("w-full rounded-lg", className)}>
            {children}
        </div>
    )
}
