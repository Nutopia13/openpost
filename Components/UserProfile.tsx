import { UserIcon, UserIconAdmin } from "../assets/Icons";

export default function UserProfile({ user }: any) {
  return (
    <div className="box-center space-y-5 mt-12">
      <img
        src={`https://robohash.org/${user.username}.png`}
        className="card-img-center bg-slate-500"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1 className="font-bold text-2xl">
        {user.displayName || "Anonymous User"}
      </h1>
    </div>
  );
}
