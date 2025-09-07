import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/UseAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon } from "lucide-react";

export default function Sidebar() {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <aside className="w-64 bg-base-200 border-base-200 border-r hidden lg:flex flex-col h-screen sticky top-0">
      <div className="border-b border-base-300 p-5">
        <Link className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="font-mono text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text ">
            Streamify
          </span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <Link
          to="/"
          className="flex justify-start btn btn-ghost w-full px-3 gap-3 normal-case"
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>
        <Link
          to="/"
          className="flex justify-start btn btn-ghost w-full px-3 gap-3 normal-case"
        >
          <UserIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>
        <Link
          to="/notifications"
          className="flex justify-start btn btn-ghost w-full px-3 gap-3 normal-case"
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>
      {/*USER PROFILE SECTION*/}
      <div className="border-t mt-auto border-base-300 p-4">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="rounded-full w-10">
            <img src={authUser?.profilePic} alt="User Avatar" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{authUser?.fullName}</p>
          <p className="flex items-center text-success text-xs gap-1">
            <span className="bg-success size-2 rounded-full inline-block" />
            Online
          </p>
        </div>
      </div>
      </div>
    </aside>
  );
}
