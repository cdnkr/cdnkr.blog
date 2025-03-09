import Button from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import CopyButton from "@/components/copybutton";
import postComponents from "@/components/post-components";

const components = {
  Button: (props) => <Button {...props} />,
  h1: (props) => (
    <h1 className="font-bold text-2xl lg:text-4xl mt-0 mb-8" {...props} />
  ),
  h2: (props) => (
    <h2 className="font-bold text-xl lg:text-3xl mt-0 mb-8" {...props} />
  ),
  h3: (props) => (
    <h3 className="font-bold text-xl lg:text-2xl mt-0 mb-8" {...props} />
  ),
  h4: (props) => (
    <h4 className="font-bold text-lg lg:text-xl mt-0 mb-8" {...props} />
  ),
  p: (props) => <p className="mb-6 leading-relaxed" {...props} />,
  ul: (props) => <ul className="list-disc list-item my-5 ml-4" {...props} />,
  ol: (props) => (
    <ol className="list-decimal my-6 ml-4" {...props} />
  ),
  li: (props) => <li className="my-4" {...props} />,
  a: (props) => (
    <a className="text-tertiary hover:text-tertiary/80 underline" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-gray-200 pl-4 my-4 italic"
      {...props}
    />
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
      <div className="lg:p-4 lg:border-2 lg:border-dashed lg:border-dark my-8">
        <div className="relative">
          <CopyButton text={text} className="absolute right-2 top-2" />
          <pre className="group p-4 overflow-x-auto text-white bg-dark">
            {children}
          </pre>
        </div>
      </div>
    );
  },
  code: ({ children, className }) => {
    if (!className) {
      return <code className="rounded px-1 py-0.5 relative">{children}</code>;
    }
    return (
      <code className={cn("hover:opacity-80", className)}>{children}</code>
    );
  },
  ...postComponents,
};

const prettyCodeOptions = {
  theme: "github-dark",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  keepBackground: true,
};

export default function MDX({ source }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
