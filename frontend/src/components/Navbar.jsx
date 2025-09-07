import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/UseAuthUser"
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import UseLogout from "../hooks/UseLogout";

export default function Navbar() {
    const {authUser} = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname.startsWith('/chat');
  const {logoutMutation} =UseLogout();
 
  return (
    <div className="border-b border-base-300 bg-base-200 h-16 flex items-center sticky t-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO ONLY IN CHAT PAGE*/}
          {true && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="font-mono text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text ">
                  Streamify
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="size-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>
          <ThemeSelector />
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
       
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="size-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </div>
  );
}