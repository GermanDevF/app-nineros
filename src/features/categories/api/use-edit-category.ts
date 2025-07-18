import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useOpenCategoryStore } from "../hooks/use-open-category";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)[":id"]["$patch"]
>["json"];

export const useEditCategory = () => {
  const { id } = useOpenCategoryStore();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.categories[":id"].$patch({
        param: { id },
        json: {
          name: data.name,
        },
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["category", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update category");
    },
  });

  return mutation;
};
