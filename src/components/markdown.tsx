import MarkdownAsync from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  children: string;
};

export function Markdown({  children }: MarkdownProps) {
  return (

      <MarkdownAsync
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary underline underline-offset-4"
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </MarkdownAsync>
 
  );
}
