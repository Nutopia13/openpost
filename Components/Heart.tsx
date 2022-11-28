// @ts-nocheck
import { firestore, auth, increment } from "../lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { HeartBreak, HeartIcon } from "../assets/Icons";
import { motions as m } from "framer-motion";
// Allows user to heart or like a post
export default function Heart({ postRef }: any) {
  // Listen to heart document for currently logged in user
  const heartRef = postRef.collection("hearts").doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  // Create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists ? (
    <button
      className="flex items-center gap-1 px-6 py-3 text-black rounded-md bg-slate-500 dark:text-white"
      onClick={addHeart}
    >
      {" "}
      <HeartIcon /> Heart
    </button>
  ) : (
    <button
      className="flex items-center gap-1 px-6 py-3 text-black rounded-md bg-slate-500 dark:text-white"
      onClick={removeHeart}
    >
      <HeartBreak /> Unheart
    </button>
  );
}
