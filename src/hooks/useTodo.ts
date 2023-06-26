import { QueryKeys } from "../react_query";
import { getTodoByID } from "../services/todoService";
import { useQuery } from "react-query";

export function useTodo(todoID: number) {
  return useQuery({
    queryKey: [QueryKeys.TODO, todoID],
    queryFn: () => getTodoByID(todoID),
  });
}
