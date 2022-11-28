import React from "react";
import Hero from "../Components/HeroSec";
import PostFeed from "../Components/PostFeed";
import { firestore, fromMillis, postToJSON } from "../lib/firebase";
import { useState } from "react";
import Loading from "../Components/Loader";
import { motion as m } from "framer-motion";
import StaticPostCont from "../Components/StaticPostCont";
import Layout from "../Components/Layout";
const LIMIT = 4;

export async function getServerSideProps(context: any) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

const Home = (props: any) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };
  return (
    <Layout>
      <main className="flex flex-col px-6 md:px-10">
        <Hero />
        <div className="max-w-[1110px] mt-7 gap-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <StaticPostCont />
          <PostFeed posts={posts} />
        </div>
        {!loading && !postsEnd && (
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={getMorePosts}
            className="px-6 py-2 mx-auto mt-6 font-bold text-white rounded-md bg-accent_blue"
          >
            Load more
          </m.button>
        )}
        <Loading show={loading} />
        <div className="flex justify-center w-full mt-6 text-black md:mt-10 dark:text-white">
          {postsEnd && "You have reached the end 😢"}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
