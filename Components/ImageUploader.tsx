// @ts-nocheck
import { useState } from "react";
import { auth, storage, STATE_CHANGED } from "../lib/firebase";
import Loader from "./Loader";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion as m } from "framer-motion";
import toast from "react-hot-toast";
// Uploads images to Firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then((d) => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
    toast.success(
      <div>
        Image Uploaded. Press{" "}
        <span className="text-orange-400">Copy Image URL</span> and paste in
        your post.
      </div>,
      {
        icon: "👍",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
        duration: 8000,
      }
    );
  };

  return (
    <div className="box">
      {!uploading && (
        <>
          <m.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-3 mt-4 font-bold text-white bg-orange-400 rounded-md cursor-pointer md:mx-9"
          >
            📸 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </m.label>
        </>
      )}
      <div>
        <CopyToClipboard
          text={`![alt](${downloadURL})`}
          onCopy={() => toast.success("Copied")}
        >
          <m.button className="flex items-center gap-2 px-4 py-3 mt-4 font-bold text-white bg-orange-400 rounded-md cursor-pointer md:mx-9">
            Copy Image URL
          </m.button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
