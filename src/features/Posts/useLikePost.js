// Library Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Local Imports
import { createLike, createUnlike } from "../../services/FormSubmitAPI";

function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLike,
    onMutate: async (postId) => {
      await queryClient.cancelQueries(["posts"]);
      const oldPosts = queryClient.getQueryData(["posts"] || []);

      queryClient.setQueryData(["posts"], (old = []) =>
        old.map((post) =>
          post._id == postId
            ? { ...post, likesCount: post.likesCount + 1 }
            : post,
        ),
      );
      return { oldPosts };
    },
    onError: (err, postId, context) => {
      console.log(err.message);
      queryClient.setQueryData(["posts"], context.oldPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
}

function useUnlikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUnlike,
    onMutate: async (postId) => {
      await queryClient.cancelQueries(["posts"]);
      const oldPosts = queryClient.getQueryData(["posts"] || []);

      queryClient.setQueryData(["posts"], (old = []) =>
        old.map((post) =>
          post._id == postId
            ? { ...post, likesCount: post.likesCount - 1 }
            : post,
        ),
      );
      return { oldPosts };
    },
    onError: (err, postId, context) => {
      console.log(err.message);
      queryClient.setQueryData(["posts"], context.oldPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
}

export { useLikePost, useUnlikePost };
