import Button from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import CopyButton from "@/components/copybutton";

const components = {
    Button: (props) => (
        <Button {...props} />
    ),
    h1: (props) => (
        <h1 className="text-2xl lg:text-4xl font-black mt-8 mb-4" {...props} />
    ),
    h2: (props) => (
        <h2 className="text-xl lg:text-3xl font-black mt-6 mb-3" {...props} />
    ),
    h3: (props) => (
        <h3 className="text-xl lg:text-2xl font-black mt-5 mb-2" {...props} />
    ),
    p: (props) => (
        <p className="my-4 leading-relaxed" {...props} />
    ),
    ul: (props) => (
        <ul className="list-disc list-inside my-4 ml-4" {...props} />
    ),
    ol: (props) => (
        <ol className="list-decimal list-inside my-4 ml-4" {...props} />
    ),
    li: (props) => (
        <li className="my-2" {...props} />
    ),
    a: (props) => (
        <a className="text-primary hover:text-primary/80 underline" {...props} />
    ),
    blockquote: (props) => (
        <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic" {...props} />
    ),
    pre: ({ children }) => {
        const getTextContent = (node) => {
            // If it"s a string, return it directly
            if (typeof node === "string") return node;
            // If null/undefined, return empty string
            if (!node) return "";
            
            // If it"s an array, map through it
            if (Array.isArray(node)) {
                return node.map(getTextContent).join("");
            }
            
            // If it has children in props, recurse
            if (node.props?.children) {
                return getTextContent(node.props.children);
            }
            
            // Fallback
            return "";
        };

        const text = getTextContent(children);
        
        return (
            <pre className="group p-4 rounded-lg overflow-x-auto my-4 text-white bg-black/20 relative">
                <CopyButton text={text} />
                {children}
            </pre>
        )
    },
    code: ({ children, className }) => {
        if (!className) {
            return (
                <code
                    className="rounded px-1 py-0.5 cursor-pointer relative"
                >
                    {children}
                </code>
            );
        }
        return (
            <code
                className={cn("cursor-pointer hover:opacity-80", className)}
            >
                {children}
            </code>
        );
    },
}

const prettyCodeOptions = {
    theme: "one-dark-pro",
    onVisitLine(node) {
        if (node.children.length === 0) {
            node.children = [{ type: "text", value: " " }]
        }
    },
    onVisitHighlightedLine(node) {
        node.properties.className.push("highlighted")
    },
    keepBackground: true,
}

export default function MDX({ source }) {
    return (
        <MDXRemote
            source={source}
            components={components}
            options={{
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        [rehypePrettyCode, prettyCodeOptions],
                    ],
                },
            }}
        />
    );
}
