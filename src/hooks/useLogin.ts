import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios";
type LoginPayload = {
  username: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  message: string;
};
export const useLogin = () => {
  const mutationFn = (payload: LoginPayload) => {
    return axiosInstance.post<LoginResponse>("/login", payload);
  };
  return useMutation({
    mutationFn,
  });
};
