import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { SafeImage } from "@/components/ui/SafeImage";

const components: Components = {
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>;
    if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
    const external = /^https?:/i.test(href);
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    const source = typeof src === "string" ? src : "";
    return (
      <figure>
        <SafeImage src={source} alt={alt || ""} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 720px" className="rounded-[1.5rem]" />
        {alt ? <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{alt}</figcaption> : null}
      </figure>
    );
  },
};

export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="story" id="story">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
