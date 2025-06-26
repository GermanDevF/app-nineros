"use client";

import { Chart } from "@/components/charts/chart";

import { LoadingGraph } from "@/components/charts/graph/loading";
import { LoadingPie } from "@/components/charts/pie/loading";

import { SpendingPie } from "@/components/charts/pie/spending-pie";

import { useGetSummary } from "@/features/summary/api/use-get-summary";

export const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <LoadingGraph />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <LoadingPie />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  );
};
