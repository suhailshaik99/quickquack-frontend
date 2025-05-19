import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../features/Authentication/userSlice";

function useMutationFunc(
  apiFunc,
  successMessage,
  errorMessage,
  isLogin = false,
) {
  const dispatch = useDispatch();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: apiFunc,
    onSuccess: (data) => {
      toast.success(successMessage, {
        id: "success-message",
      });
      isLogin && dispatch(userLogin(data.userDetails));
    },
    onError: (error) =>
      toast.error(error.message || errorMessage, {
        id: "auth-error",
      }),
  });
  return [mutate, isPending, isSuccess];
}

export default useMutationFunc;
