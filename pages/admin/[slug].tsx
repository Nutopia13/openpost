// @ts-nocheck
import styles from "../../styles/Admin.module.css";
import AuthCheck from "../../lib/AuthCheck";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";
import { motion as m } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import ImageUploader from "../../Components/ImageUploader";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import toast from "react-hot-toast";
import { DeleteBin, Eye, Flask, Tools } from "../../assets/Icons";
import Layout from "../../Components/Layout";

export default function AdminPostEdit(props: any) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug);
  const [post] = useDocumentData(postRef);

  return (
    <main>
      {post && (
        <div className=" flex flex-col max-w-[1100px] md:space-x-4 mx-6 my-6  md:mx-auto justify-center  md:flex-row">
          <div className="flex flex-col mt-5 text-center md:text-left">
            <h1 className="text-4xl text-black dark:text-white font-bold md:max-w-[250px]">
              {post.title}
            </h1>
            <p className="text-[10px] text-slate-400 pt-2">ID: {post.slug}</p>
          </div>
          <section className="flex-1">
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>
          <aside className="flex max-h-[500px] sticky flex-col mt-5 py-4 items-center rounded-md bg-accent_blue text-white">
            <div className="flex items-center space-x-2">
              <Tools />
              <h3 className="text-xl font-bold ">Tools</h3>
            </div>
            <div></div>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPreview(!preview)}
              className="flex items-center px-8 py-3 mx-auto font-bold text-white rounded-md bg-neutral_grey mt-7 md:mx-9 gap-x-2"
            >
              <div>
                {" "}
                <Flask />
              </div>
              {preview ? "Edit" : "Preview"}
            </m.button>
            <Link href={`/${post.username}/${post.slug}`}>
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 px-6 py-3 mt-4 font-bold text-white bg-green-400 rounded-md md:mx-9 "
              >
                <Eye /> Live View
              </m.button>
            </Link>
            <ImageUploader />
            <DeletePostButton postRef={postRef} />
            <div>
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
              >
                <p className="pt-4 text-sm opacity-70 justify-self-end-baseline">
                  How to write?
                </p>
              </a>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }: any) {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content, published }: any) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully!");
  };

  return (
    <section className="flex flex-col items-center justify-center mx-6 mt-5 rounded-md lg:mx-auto">
      <form
        onSubmit={handleSubmit(updatePost)}
        className="w-full text-black bg-white rounded-sm dark:text-white dark:bg-primary_pale_dark"
      >
        {preview && (
          <div className="card">
            <ReactMarkdown>{watch("content")}</ReactMarkdown>
          </div>
        )}

        <div className={preview ? styles.hidden : styles.controls}>
          <textarea
            {...register("content", {
              required: "content is required",
              maxLength: 2000,
              minLength: 10,
            })}
            className="rounded-md dark:bg-primary_pale_dark"
          ></textarea>
          {errors.content && (
            <p className="pl-4 font-bold text-red-500">
              {errors.content.message}
            </p>
          )}
          <fieldset className="py-2 pl-4">
            <input
              className=""
              type="checkbox"
              {...register("published", { required: true })}
            />
            <label className="pl-2 text-lg dark:text-white ">Publish</label>
          </fieldset>

          <button
            onClick={() => toast.success("Post saved successfully!")}
            type="submit"
            className="py-2 text-xl font-bold text-white bg-green-400 cursor-pointer"
            disabled={!isDirty || !isValid}
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}
function DeletePostButton({ postRef }: any) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      await postRef.delete();
      router.push("/admin");
      toast("post annihilated ", {
        style: {
          color: "white",
          fontWeight: "bold",
          backgroundColor: "red",
        },
        icon: <DeleteBin />,
      });
    }
  };

  return (
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center py-3 mt-4 space-x-4 font-bold text-white bg-red-600 rounded-md gap-x-2 md:mx-9 px-9"
      onClick={deletePost}
    >
      <DeleteBin /> Delete
    </m.button>
  );
}
