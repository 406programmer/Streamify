import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup";

export default function SignUpPage() {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

 const {signUpMutation,isPending,error} = useSignup();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation(signUpData);
    console.log("signUpData : ", signUpData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left side - form*/}
        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-8">
          {/* Logo*/}
          <div className="mb-4 flex justify-start items-center gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold bg-clip-text text-transparent font-mono bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>
          {error && (
            <div className="alert alert-error mb-4">
              <span> {error.response.data.message}</span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify ans start your language learning adventure!
                  </p>
                </div>
                {/*FullName*/}
                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Sourabh Sharma"
                      className="input input-bordered w-full"
                      value={signUpData.fullName}
                      onChange={(e) => {
                        setSignUpData({
                          ...signUpData,
                          fullName: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  {/* Email Address */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example1234@gmail.com"
                      className="input input-bordered w-full"
                      value={signUpData.email}
                      onChange={(e) => {
                        setSignUpData({ ...signUpData, email: e.target.value });
                      }}
                      required
                    />
                  </div>
                  {/* Password */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full"
                      value={signUpData.password}
                      onChange={(e) => {
                        setSignUpData({
                          ...signUpData,
                          password: e.target.value,
                        });
                      }}
                      required
                    />
                    <p className="text-sm mt-1 opacity-70">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-sm leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button className="btn-primary btn w-full" type="submit">
                  {isPending ?( 
                    <>
                  <span className="loading loading-spinner"></span>
                  Loading...
                    </>
                  ) : "Create Account"}
                </button>
                <div className="text-sm">
                  <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Right side - image*/}
        <div className="hidden lg:flex lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/videoCall.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
