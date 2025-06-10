// Library Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Local Imports
import { createComment } from "../services/FormSubmitAPI";

export default function useComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries(["posts"]);
      const oldPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old = []) =>
        old.map((post) =>
          post._id == postId
            ? { ...post, commentsCount: post.commentsCount + 1 }
            : post,
        ),
      );
      return { oldPosts };
    },

    onError: (err, postId, context) => {
      console.log(err);
      queryClient.setQueryData(["posts"], context.oldPosts);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
}
