import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export  function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate: checkin, isLoading: isCheckingIn} = useMutation({
    mutationFn: ({id, breakfast})=>updateBooking(id, {status: "checked-in", isPaid: true, ...breakfast}),

    onSuccess: (data)=>{
      toast.success(`Booking #${data.id} successfully checked in`)
      queryClient.invalidateQueries({active: true});
      navigate(-1);
    },
    
    onError: ()=> toast.error("There was an error while checking in"),
  });
  return {checkin, isCheckingIn};
}