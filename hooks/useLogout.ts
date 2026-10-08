"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { storage } from "@/utils/storage";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    queryClient.clear();
    storage.clear();
    router.replace("/login");
  };

  return { logout };
};
