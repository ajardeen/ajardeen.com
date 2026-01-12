import MarkdownAsync from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  className?: string;
  children: string;
};

export function Markdown({ className, children }: MarkdownProps) {
  return (
    <div
      className={`markdown
        prose prose-sm max-w-none dark:prose-invert
        prose-ul:list-disc prose-ul:pl-5
        prose-ol:list-decimal prose-ol:pl-5
        prose-li:my-1
        ${className ?? ""}
      `}
    >
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
    </div>
  );
}
