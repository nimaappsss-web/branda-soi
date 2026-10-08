import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/lib/axios";
import { Method } from "./constants";

export const fetchData = async <T>(
  url: string,
  method: Method,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.request<T>({
    url,
    method,
    data,
    ...config,
  });
  return response.data;
};
