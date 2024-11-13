import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

type Entity = {
  tableName: string;
  columns: {
    propertyName: string;
    type?: string;
    enum?: string[];
    relation?: Entity;
  }[];
};
export type MetaDataResponse = {
  data: Entity[];
};
export const useMetadata = () => {
  const queryFn = () => {
    return axiosInstance.get<MetaDataResponse>("/metadata");
  };
  return useQuery({
    queryKey: ["metadata"],
    queryFn,
  });
};
