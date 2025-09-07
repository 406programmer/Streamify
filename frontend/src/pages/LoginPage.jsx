import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "sourabh50.personal@gmail.com",
    password: "123456",
  });

 const {loginMutation,isPending,error} = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div
      className="flex justify-center items-center h-screen p-4 sm:p-6 md:p-8"
   
    >
      <div className="border border-primary/25 flex flex-col  lg:flex-row w-full max-w-5xl mx-auto rounded-xl shadow-lg overflow-hidden bg-base-100 ">
        {/*LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col">
          {/*LOGO*/}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-xl font-mono font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wider">
              Streamify
            </span>
          </div>
          {/*Error Message Display*/}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error?.response?.data?.message}</span>{" "}
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-xl">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex w-full space-y-2"></div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={loginData.email}
                    className="input input-bordered w-full"
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex w-full space-y-2"></div>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="*********"
                    value={loginData.password}
                    className="input input-bordered w-full"
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>{" "}
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/*IMAGE SECTION */}
        <div className=" hidden lg:flex w-full lg:w-1/2 bg-primary/10 justify-center items-center">
          <div className="max-w-md p-8">
            <div className="max-w-sm aspect-square relative mx-auto">
              <img
                src="videoCall.png"
                alt="login image"
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
