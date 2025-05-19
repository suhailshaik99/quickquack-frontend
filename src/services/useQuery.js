import { useQuery } from "@tanstack/react-query";

function useQueryFn(queryKey, queryFun) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: queryFun,
    staleTime: 0,
    refetchOnMount: true,
  });
}

export default useQueryFn;
