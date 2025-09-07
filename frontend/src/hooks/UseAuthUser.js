import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

export default function useAuthUser() {
     const {
        data: authData,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["authUser"],
        queryFn: getAuthUser,
        retry: false,
      });
    //   console.log("authData from useAuthUser hook : ", authData?.user);//auth data has success and user fields coming from http get /auth/me request
        return {authUser : authData?.user, isLoading, error };
}