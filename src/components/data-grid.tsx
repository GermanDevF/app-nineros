"use client";

import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import { fromatDateRange } from "@/lib/utils";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { DataCard } from "./data-card";

export const DataGrid = () => {
  const searchParams = useSearchParams();

  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  const { data } = useGetSummary();

  const dateRange = fromatDateRange({ from, to });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        change={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dateRange}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        change={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="success"
        dateRange={dateRange}
      />
      <DataCard
        title="Expenses"
        value={data?.expensesAmount}
        change={data?.expensesChange}
        icon={FaArrowTrendDown}
        variant="danger"
        dateRange={dateRange}
      />
    </div>
  );
};
