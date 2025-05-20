import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser(){
    const queryClient = useQueryClient();

    const {mutate: updateUser, isLoading: isUpdating} = useMutation({
        mutationFn: UpdateCurrentUser,
        onSuccess: ({user})=>{
            toast.success("User account successfully updated");
            queryClient.setQueryData(["user"], user)
        },
        onError: (err)=>{
            toast.error(err.message);
        }
    })
    return {updateUser, isUpdating};
}