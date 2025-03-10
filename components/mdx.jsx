import CopyButton from "@/components/copybutton";
import postComponents from "@/components/post-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

const components = {
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
    // check if this code element is inside a pre element
    const isInPre = 
    Array.isArray(children) && children.some(child => child.type === 'span')
    || (typeof children === 'object' && children?.type === 'span');

    if (!className && !isInPre) {
      return (
        <code className="px-0.5 bg-dark/10 relative before:content-[''] after:content-['']">
          {children}
        </code>
      );
    }
    return (
      <code className={className}>{children}</code>
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
    <div className="prose prose-headings:text-dark prose-p:text-dark prose-li:text-dark prose-ul:text-dark prose-ol:text-dark prose-ol:marker:text-dark prose-ul:marker:text-dark prose-a:text-tertiary prose-a:hover:text-tertiary/80 prose-a:font-bold prose-pre:rounded-none prose-pre:my-0">
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
    </div>
  );
}
