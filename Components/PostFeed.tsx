import Link from "next/link";
import Image from "next/image";
import { ErrorCircle, HeartIcon, SuccessCircle } from "../assets/Icons";
import ReactMarkdown from "react-markdown";
import { motion as m } from "framer-motion";
export default function PostFeed({ posts, admin }: any) {
  return posts
    ? posts.map((post: any) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }: any) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <>
      <m.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        className="relative z-50 bg-white rounded-md shadow-sm dark:bg-primary_pale_dark md:mx-0"
      >
        <div className="absolute flex items-center right-4 top-3">
          <HeartIcon />
          <p className="text-sm font-bold text-black dark:text-white">
            {post.heartCount || 0}
          </p>
        </div>
        <Link href={`/${post.username}/${post.slug}`}>
          <div className="relative flex flex-col p-8 space-y-2 text-cont">
            <p className="font-bold text-primary_pale">Article</p>
            <h4 className="text-xl font-bold text-black dark:text-white h-11">
              {post.title}
            </h4>
            <p className="relative h-24 pt-4 overflow-hidden text-black dark:text-white">
              <ReactMarkdown>{post.content.substring(0, 70)}</ReactMarkdown>...
            </p>
            <Link href={`/${post.username}`}>
              <div className="bottom-0 flex items-center pt-6 space-x-5">
                <img
                  src={`https://robohash.org/${post.username}.png`}
                  alt=""
                  className="rounded-full w-14 bg-slate-500"
                  

                />
                <div>
                  <p className="font-bold text-accent_blue">@{post.username}</p>
                  <p className="text-sm dark:text-white/70 text-black/50">
                    {new Intl.DateTimeFormat("en-UK", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(post.updatedAt)}{" "}
                    🔹 {minutesToRead} min read
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </Link>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <div className="pl-6 pt-4 pb-2 dark:border-[#121721]/20 border-t-2">
            <Link href={`/admin/${post.slug}`}>
              <h3>
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-2 mx-auto font-bold text-white rounded-md bg-accent_blue"
                >
                  Edit
                </m.button>
              </h3>
            </Link>

            {post.published ? (
              <p className="flex items-center gap-2 pt-4 font-bold text-green-400">
                {" "}
                <SuccessCircle className="animate-pulse" />
                Live
              </p>
            ) : (
              <p className="flex items-center gap-2 pt-4 font-bold text-red-400">
                <ErrorCircle />
                Unpublished
              </p>
            )}
          </div>
        )}
      </m.div>
    </>
  );
}
