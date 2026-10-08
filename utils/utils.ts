import { AxiosError } from "axios";

export interface AxiosErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[] | string>;
  data?: {
    message?: string;
    errors?: Record<string, string[] | string>;
  };
}

export const transformError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const errData = error.response?.data as AxiosErrorResponse | undefined;

    if (errData?.errors) {
      const firstError = Object.values(errData.errors)[0];
      if (Array.isArray(firstError)) {
        return firstError[0] || "An error occurred";
      }
      return firstError || "An error occurred";
    }

    if (errData?.data?.errors) {
      const firstError = Object.values(errData.data.errors)[0];
      if (Array.isArray(firstError)) {
        return firstError[0] || "An error occurred";
      }
      return firstError || "An error occurred";
    }

    return (
      errData?.message ||
      errData?.error ||
      errData?.data?.message ||
      error.message ||
      "An error occurred. Please try again later."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An error occurred. Please try again later.";
};
