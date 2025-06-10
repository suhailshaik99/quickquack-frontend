import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { authenticateUser } from "../services/FormSubmitAPI";
import { userAuthentication, userLogout } from "../features/Authentication/userSlice";

function useAuth() {
  const dispatch = useDispatch();

  const queryResult = useQuery({
    queryKey: ["authStatus"],
    queryFn: authenticateUser,
    refetchInterval: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess() {
      dispatch(userAuthentication());
    },
  });

  const { isError, error } = queryResult;
  useEffect(
    function () {
      if (error?.message == 401) {
        toast.error("Session Expired. Please Login again");
        dispatch(userLogout());
      }
    },
    [isError, dispatch, error],
  );

  return queryResult;
}

export default useAuth;
