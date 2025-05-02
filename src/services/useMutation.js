import { useMutation } from "@tanstack/react-query";

function useMutationFunc(apiFunc, successMessage, errorMessage) {
  const { mutate } = useMutation({
    mutationFn: apiFunc,
    onSuccess: () => console.log(successMessage),
    onError: () => console.log(errorMessage),
  });
  return mutate;
}

export default useMutationFunc;
