import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


export default function UseLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
      mutate: logoutMutation,
      isPending,
      error,
    } = useMutation({
      mutationFn: logout,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["authUser"]});
        toast.success("User logged out Successfully!");
        navigate("/login");
      },
    });
  return {logoutMutation,isPending,error}
}