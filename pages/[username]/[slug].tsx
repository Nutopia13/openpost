// @ts-nocheck
import PostContent from "../../Components/PostContent";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { HeartIcon } from "../../assets/Icons";
import Metatags from "../../Components/Metatags";
import Link from "next/link";
import Heart from "../../Components/Heart";
import AuthCheck from "../../lib/AuthCheck";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import Layout from "../../Components/Layout";

export async function getStaticProps({ params }: any) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc: any) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",
  };
}

export default function Post(props: any) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;
  const { user: currentUser } = useContext(UserContext);
  return (
    <Layout>
      <main className="flex flex-col  mt-5 mx-6  max-w-[1100px] md:mx-11 lg:mx-auto">
        <Metatags title={post.title} description={post.content} />
        <section>
          <PostContent post={post} />
          <aside>
            <aside className="mt-6 card">
              <AuthCheck>
                <Heart postRef={postRef} />
              </AuthCheck>

              {currentUser?.uid === post.uid && (
                <Link href={`/admin/${post.slug}`}>
                  <button className="px-6 py-2 mx-auto mt-3 font-bold text-white rounded-md bg-accent_blue">
                    Edit Post
                  </button>
                </Link>
              )}
            </aside>
          </aside>
        </section>
      </main>
    </Layout>
  );
}
