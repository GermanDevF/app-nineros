import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useOpenTransactionStore } from "@/features/transactions/hooks/use-open-transaction";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)[":id"]["$patch"]
>["json"];

export const useEditTransaction = () => {
  const { id } = useOpenTransactionStore();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.transactions[":id"].$patch({
        param: { id },
        json: {
          amount: data.amount,
          payee: data.payee,
          notes: data.notes,
          date: data.date,
          accountId: data.accountId,
          categoryId: data.categoryId,
        },
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Transaction updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["transaction", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update transaction");
    },
  });

  return mutation;
};
