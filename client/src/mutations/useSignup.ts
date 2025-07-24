import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { SignupSchema } from "@/lib/authSchemas";

export function useSignup() {
  return useMutation({
    mutationFn: async (newUser: SignupSchema) => {
      const response = await api.post("/users", newUser);
      return response.data;
    },
  });
}
