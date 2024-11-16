import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { Etype } from "../fields";

export type Entity = {
  name?: string;
  type?: Etype;
  enum?: string[];
  alias: string;
  label?: string;
  tableName: string;
  columns: Entity[];
};
export type MetaDataResponse = Entity[];
export const useMetadata = () => {
  const queryFn = () => {
    return axiosInstance.get<MetaDataResponse>("/metadata");
  };
  return useQuery({
    queryKey: ["metadata"],
    queryFn,
  });
};
