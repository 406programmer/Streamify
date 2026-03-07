import { Link } from "react-router";
import getLanguageFlag from "../utilityFunction/getLanguageFlag";
import profilePic from "/profilePic.png"

export default function FriendCard({ friend }) {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow gap-4 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-12 avatar">
          <img
            src={profilePic}
            alt={friend.fullName}
            c
          />
        </div>
        <h3 className="font-semibold truncate">{friend.fullName}</h3>
      </div>
      <div className="flex flex-wrap gap-1 5 mb-3">
        <span className="badge badge-secondary text-xs">
          {getLanguageFlag(friend.nativeLanguage)}
          Native : {friend.nativeLanguage}
        </span>
        <span className="badge badge-outline text-xs">
          {getLanguageFlag(friend.learningLanguage)}
          Learning : {friend.learningLanguage}
        </span>
      </div>
      <Link className="btn btn-outline w-full" to={`/chat/${friend._id}`}>
        Message
      </Link>
    </div>
  );
}
