import Link from "next/link";
import Image from "next/image";
import { ErrorCircle, HeartIcon, SuccessCircle } from "../assets/Icons";
import people from "../assets/36.jpg";
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
        className="bg-white z-50 dark:bg-primary_pale_dark md:mx-0 shadow-sm relative rounded-md"
      >
        <div className="absolute right-4 top-3 flex  items-center">
          <HeartIcon />
          <p className="text-sm text-black dark:text-white font-bold">
            {post.heartCount || 0}
          </p>
        </div>
        <Link href={`/${post.username}/${post.slug}`}>
          <div className="text-cont relative p-8 flex flex-col space-y-2">
            <p className="text-primary_pale font-bold">Article</p>
            <h4 className="font-bold text-black dark:text-white text-xl h-11">
              {post.title}
            </h4>
            <p className="pt-4 h-24 relative text-black dark:text-white overflow-hidden">
              {post.content.substring(0, 100)}...
            </p>
            <Link href={`/${post.username}`}>
              <div className="pt-6 flex items-center space-x-5 bottom-0">
                <Image
                  src={post?.photoURL}
                  alt=""
                  className="rounded-full  w-14"
                />
                <div>
                  <p className="text-accent_blue font-bold">@{post.username}</p>
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
                  className="bg-accent_blue mx-auto rounded-md px-6 py-2 text-white font-bold"
                >
                  Edit
                </m.button>
              </h3>
            </Link>

            {post.published ? (
              <p className="text-green-400 pt-4 font-bold flex items-center gap-2">
                {" "}
                <SuccessCircle className="animate-pulse" />
                Live
              </p>
            ) : (
              <p className="text-red-400 font-bold pt-4 flex items-center gap-2">
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
