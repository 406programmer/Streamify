import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
// import toast from "react-hot-toast";

export default function useSignup() {
    const queryClient = useQueryClient();

    const {
      mutate: signUpMutation,
      isPending,
      error,
    } = useMutation({
      mutationFn: signup,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      retry: false,
    //   onError:()=>toast.success(error.response.data.message),
    });
    
  return {signUpMutation,isPending,error}
}