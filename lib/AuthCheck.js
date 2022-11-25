import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <div className="flex flex-col justify-center items-center ">
            <h3 className="mt-5 font-bold text-lg">You must be signed in</h3>
          <Link href="/enter" className="pt-8">
            <button className="bg-accent_blue rounded-md px-6 py-2 mt-5 text-white font-bold">Sign In</button>
          </Link>
        </div>
      );
}
