// @ts-nocheck
import AuthCheck from "../../lib/AuthCheck";
import PostFeed from "../../Components/PostFeed";
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { Add } from "../../assets/Icons";
import { motion as m } from "framer-motion";
import Metatags from "../../Components/Metatags";
import Layout from "../../Components/Layout";

export default function AdminPostsPage(props: any) {
  return (
    <main>
      <Metatags title="Admin Page" description="Admin Page" />
      <AuthCheck>
        <CreateNewPost />
        <PostList />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <div className="max-w-[1110px] mx-auto my-5 ">
      <h1 className="mx-6 text-2xl font-bold lg:mx-0">Manage Posts</h1>
      <div className="max-w-[1110px] mx-6 mt-7 gap-5 lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PostFeed posts={posts} admin />
      </div>
    </div>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e: any) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success("Post created!");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <Layout>
      <section className="flex max-w-[1110px]  items-center lg:mx-auto justify-center mt-5 mx-6 rounded-md dark:bg-primary_pale_dark bg-white">
        <form
          onSubmit={createPost}
          className="flex flex-col items-center px-4 py-4 space-y-5"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Article!"
            className="outline-none  py-2 border-2 text-black dark:text-white dark:border-primary_pale_dark dark:bg-[#121721;] rounded-md text-xl font-bold text-center w-full"
          />
          <p className="text-black dark:text-white">
            <strong>Title:</strong> {slug}
          </p>
          <m.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={!isValid}
            className="flex items-center p-2 font-bold text-white bg-green-500 rounded-lg cursor-pointer"
          >
            Create Post
            <Add />
          </m.button>
        </form>
      </section>
    </Layout>
  );
}
