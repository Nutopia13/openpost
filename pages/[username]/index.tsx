import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import UserProfile from "../../Components/UserProfile";
import PostFeed from "../../Components/PostFeed";
import Metatags from "../../Components/Metatags";

export async function getServerSideProps({ query }: any) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
}

export default function UserProfilePage({ user, posts }: any) {
  return (
    <main>
      <Metatags title={user.username} description={user.title} />
      <UserProfile user={user} />
      <div className="max-w-[1110px] mt-10 md:mt-14 justify-center items-center gap-5 mx-6 md:mx-11 lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PostFeed posts={posts} />
      </div>
    </main>
  );
}
