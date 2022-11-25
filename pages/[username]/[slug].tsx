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
    <main className="flex flex-col  mt-5 mx-6 max-w-[1100px] md:mx-auto">
      <Metatags title={post.title} description={post.content} />
      <section>
        <PostContent post={post} />
        <aside>
          <aside className="card">
            <AuthCheck>
              <Heart postRef={postRef} />
            </AuthCheck>

            {currentUser?.uid === post.uid && (
              <Link href={`/admin/${post.slug}`}>
                <button className="bg-accent_blue mx-auto rounded-md px-6 py-2 mt-3 text-white font-bold">
                  Edit Post
                </button>
              </Link>
            )}
          </aside>
        </aside>
      </section>
    </main>
  );
}
