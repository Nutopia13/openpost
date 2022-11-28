import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex flex-col items-center mt-5">
      <h1>404 | This page does not seem to exist... :(</h1>
      <Link href="/">
        <button className="px-6 py-2 mt-5 font-bold text-white rounded-md bg-accent_blue">
          Go home
        </button>
      </Link>
    </main>
  );
}
