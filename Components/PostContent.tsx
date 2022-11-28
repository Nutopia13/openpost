import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { HeartIcon } from "../assets/Icons";


// UI component for main post content
export default function PostContent({ post, children, language }: any) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

      const wordCount = post?.content.trim().split(/\s+/g).length;
      const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="">
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold ">{post?.title}</h1>
        <span className="text-sm text-slate-400">
          Written by <Link href={`/${post.username}/`} className='font-bold text-accent_blue'>@{post.username}</Link>{" "}
          on {new Intl.DateTimeFormat('en-UK', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(createdAt)}
          <aside className="flex items-center justify-center space-x-3 md:justify-start">
          <p className="pt-2">🔹{minutesToRead} min</p>
        <p>
          <strong className="flex items-center mt-3 text-black dark:text-white gap-x-1">{post.heartCount || 0} <HeartIcon /></strong>
        </p>

      </aside>
      
        </span>
      </div>
      <div className="relative p-5 mt-6 overflow-hidden text-black bg-white rounded-md dark:text-white dark:bg-primary_pale_dark">
      <ReactMarkdown>{post?.content}</ReactMarkdown>
      </div>
      
    </div>
  );
}
