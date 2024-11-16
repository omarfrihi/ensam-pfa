import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

type QueryResult = {
  id: number;
  query: string;
  queryResult: object[];
  createdAt: string;
};

export const useQueryHistory = () => {
  const queryFn = () => {
    return axiosInstance.get<QueryResult[]>("/query-history");
  };
  return useQuery({
    queryKey: ["queryHistory"],
    queryFn,
  });
};
