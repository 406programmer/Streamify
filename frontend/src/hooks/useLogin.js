import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import toast from "react-hot-toast";

export default function useLogin() {
    const queryClient = useQueryClient();

    const {
      mutate: loginMutation,
      isPending,
      error,
    } = useMutation({
      mutationFn: login,
      onSuccess: () => {
        toast.success("User logged in Successfully!");
        queryClient.invalidateQueries({queryKey : ["authUser"]});
      },
    //   onError: () => {
    //     toast.error(error.response.data.message);
    //   },
    });
  return {loginMutation,isPending,error}
}