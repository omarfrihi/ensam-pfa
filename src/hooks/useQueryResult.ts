import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

export const useQueryResult = (
  params: object,
  select: string[],
  where: string,
  tables: string[]
) => {
  const queryFn = ({ queryKey }: any) => {
    const [, params, select, where] = queryKey;
    return axiosInstance.get<object[]>("/query-result", {
      params: {
        params,
        select,
        where,
        tables,
      },
    });
  };
  return useQuery({
    queryKey: ["queryResult", params, select, where, tables],
    queryFn,
    enabled: false,
  });
};
