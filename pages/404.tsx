import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex flex-col items-center mt-5">
      <h1>404 | This page does not seem to exist... :(</h1>
      <Link href="/">
        <button className="mt-5 bg-accent_blue rounded-md px-6 py-2 text-white font-bold">
          Go home
        </button>
      </Link>
    </main>
  );
}
