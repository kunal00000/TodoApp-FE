import { QueryKeys } from "../react_query";
import { getAllTodos } from "../services/todoService";
import { useQuery } from "react-query";

export function useTodos() {
  return useQuery({
    queryKey: QueryKeys.TODOS,
    queryFn: () => getAllTodos(),
  });
}
