import { useState } from "react";
import useAuthUser from "../hooks/UseAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnBoarding } from "../lib/api";
import {
  CameraIcon,
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants/index";

export default function OnBoardingPage() {
  const { authUser, isLoading } = useAuthUser();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    learningLanguage: authUser?.learningLanguage || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    profilePic: authUser?.profilePic || "",
    location: authUser?.location || "",
  });

  const { mutate: onBoardingMutation, isPending } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError:(error)=>{
      toast.error(error.response.data.message);
    }
    ,
    retry: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(formState);
  };
  const handleRandomAvatar = () => {
    const idx=Math.floor(Math.random()*100)+1;//math.random generate value from 0 to 1 in decimal then its is multiplied by 100 then floor it which makes the range from 0 to 99 then we add one which make the range 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({...formState,profilePic:randomAvatar})
    toast.success("Random profile pic generated!")
  };

  return (
    <div className=" bg-slate-100 min-h-screen flex justify-center items-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl text-center font-bold mb-6">
            Complete Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/*profile pic container*/}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="overflow-hidden size-32 rounded-full  bg-base-200">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <CameraIcon className="size-12 opacity-40 text-base-content" />
                  </div>
                )}
              </div>
              {/*Generate random avatar*/}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="mr-2 size-4" /> Generate Random Avatar
                </button>
              </div>
            </div>
            {/*Full name*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                className="input input-bordered w-full"
                placeholder="Enter full name"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
              />
            </div>
            {/*Bio*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                placeholder="Tell others about yourself and your language learning goals"
                className="textarea textarea-bordered h-24"
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
              />
            </div>
            {/*Languages*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/*Native Languages*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="native language"
                  className="select select-bordered w-full"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              {/*Learning Languages*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="native language"
                  className="select select-bordered w-full"
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select language you are learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/*Location*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className=" absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState?.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
            {/*Submit*/}
            <button
              className="w-full btn btn-primary "
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="mr-2 size-5" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
