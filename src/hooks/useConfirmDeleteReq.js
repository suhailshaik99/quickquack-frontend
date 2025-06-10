// Library Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Local Imports
import {
  confirmFriendRequest,
  deleteFriendRequest,
} from "../services/FormSubmitAPI";

function useDeleteReq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFriendRequest,
    onSettled() {
      queryClient.invalidateQueries(["pendingRequests"]);
    },
  });
}

function useConfirmReq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmFriendRequest,
    onSettled() {
      queryClient.invalidateQueries(["pendingRequests"]);
    },
  });
}

export { useDeleteReq, useConfirmReq };
