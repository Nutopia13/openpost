import React from "react";
import CardPostCont from "../Components/CardPostCont";
import Hero from "../Components/HeroSec";
import PostFeed from "../Components/PostFeed";
import { firestore, fromMillis, postToJSON } from "../lib/firebase";
import { useState } from "react";
import Loading from "../Components/Loader";
import { motion as m } from "framer-motion";
import StaticPostCont from "../Components/StaticPostCont";
const LIMIT = 1;

export async function getServerSideProps(context) {
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
    <main className="px-6 flex flex-col">
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
          className="bg-accent_blue mx-auto mt-6 rounded-md px-6 py-2 text-white font-bold"
        >
          Load more
        </m.button>
      )}
      <Loading show={loading} />
      {postsEnd && "You have reached the end!"}
    </main>
  );
};

export default Home;
