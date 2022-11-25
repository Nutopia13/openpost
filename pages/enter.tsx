// @ts-nocheck
import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { GoogleIcon } from "../assets/Icons";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import debounce from "lodash.debounce";
import { useEffect, useState, useCallback } from "react";

export default function SignIn(props: any) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button
      className="flex bg-neutral_grey mx-auto  mt-7 md:mx-9 font-bold text-white rounded-md items-center space-x-2 py-3 px-6"
      onClick={signInWithGoogle}
    >
      <GoogleIcon />
      <p>Sign in with Google</p>
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return (
    <button
      className="flex bg-neutral_grey mx-auto  mt-7 md:mx-9 font-bold text-white rounded-md items-center space-x-2 py-3 px-6"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </button>
  );
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e: any) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username: any) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <div className="flex w-full items-center justify-center">
        <section className="mt-5 bg-primary_pale text-white rounded-md p-7">
          <h3 className="font-bold text-lg">Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input
              className="mt-5 bg-neutral_grey outline-none rounded-md px-6 py-2 text-white font-bold"
              name="username"
              placeholder="myname"
              value={formValue}
              onChange={onChange}
            />
            <UsernameMessage
              username={formValue}
              isValid={isValid}
              loading={loading}
            />
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 mt-5 bg-green-600 text-white font-bold rounded-md "
              disabled={!isValid}
            >
              Choose
            </button>
          </form>
        </section>
      </div>
    )
  );
}
{
  /*ts-ignore*/
}
function UsernameMessage({ username, isValid, loading }: any) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-green-500">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-red-500">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
