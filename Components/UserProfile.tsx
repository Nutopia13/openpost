import { UserIcon, UserIconAdmin } from "../assets/Icons";

export default function UserProfile({ user }: any) {
  return (
    <div className="mt-12 space-y-5 box-center">
      <img
        src={`https://robohash.org/${user.username}.png`}
        className="card-img-center bg-slate-500"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1 className="text-2xl font-bold">
        {user.displayName || "Anonymous User"}
      </h1>
    </div>
  );
}
