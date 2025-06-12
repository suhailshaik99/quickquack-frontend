// Library Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Local Imports
import { removeFollower, unfollowUser } from "../services/FormSubmitAPI";

function useRemoveFollower() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFollower,
    onSettled() {
      queryClient.invalidateQueries(["friends"]);
      queryClient.invalidateQueries(["profileDetails"]);
    },
  });
}

function useUnfollow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unfollowUser,
    onSettled() {
      queryClient.invalidateQueries(["friends"]);
      queryClient.invalidateQueries(["profileDetails"]);
    },
  });
}

export { useRemoveFollower, useUnfollow };
