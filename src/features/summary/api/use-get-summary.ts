import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";

export const useGetSummary = () => {
  const searchParams = useSearchParams();

  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const accountId = searchParams.get("accountId") ?? "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          accountId,
          from,
          to,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const { data } = await response.json();

      return {
        ...data,
        incomeAmount: convertAmountFromMiliunits(data.incomeAmount ?? 0),
        expensesAmount: convertAmountFromMiliunits(data.expensesAmount ?? 0),
        remainingAmount: convertAmountFromMiliunits(data.remainingAmount ?? 0),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMiliunits(category.value ?? 0),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMiliunits(day.income ?? 0),
          expenses: convertAmountFromMiliunits(day.expenses ?? 0),
        })),
      };
    },
  });

  return query;
};
