import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

function useMutationFunc(apiFunc, successMessage, errorMessage) {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: apiFunc,
    onSuccess: () => {
      toast.success(successMessage, {
        id: "success-message",
      });
    },
    onError: (error) =>
      toast.error(error.message || errorMessage, {
        id: "auth-error",
      }),
  });
  return [mutate, isPending, isSuccess];
}

export default useMutationFunc;
