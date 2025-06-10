// Library Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Local Imports
import {
  cancelFriendRequest,
  sendFriendRequest,
} from "../../services/FormSubmitAPI";

function useSendReq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendFriendRequest,
    async onMutate(recipientId) {
      await queryClient.cancelQueries(["suggestedFriends"]);
      const oldFriends = queryClient.getQueryData(["suggestedFriends"] || []);
      queryClient.setQueryData(["suggestedFriends"], (old) => {
        old.map((friend) =>
          friend._id == recipientId ? { ...friend, isRequested: true } : friend,
        );
      });
      return { oldFriends };
    },
    onError(err, recipientId, context) {
      queryClient.setQueryData(["suggestedFriends"], context.oldFriends);
    },
    onSettled() {
      queryClient.invalidateQueries(["suggestedFriends"]);
    },
  });
}

function useCancelReq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelFriendRequest,
    async onMutate(recipientId) {
      await queryClient.cancelQueries(["suggestedFriends"]);
      const oldFriends = queryClient.getQueryData(["suggestedFriends"] || []);
      queryClient.setQueryData(["suggestedFriends"], (old) => {
        old.map((friend) =>
          friend._id == recipientId ? { ...friend, isRequested: true } : friend,
        );
      });
      return { oldFriends };
    },
    onError(err, _, context) {
      queryClient.setQueryData(["suggestedFriends"], context.oldFriends);
    },
    onSettled() {
      queryClient.invalidateQueries(["suggestedFriends"]);
    },
  });
}

export { useSendReq, useCancelReq };
