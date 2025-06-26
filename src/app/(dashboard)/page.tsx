import { Suspense } from "react";

import { DataGrid } from "@/components/data-grid";

import { DataCardSk } from "@/components/skelletons/data-card-sk";
import { DataCharts } from "@/components/data-charts";

export default function Dashboard() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 space-y-8 grid">
      <Suspense
        fallback={Array.from({ length: 3 }).map((_, index) => (
          <DataCardSk key={index} />
        ))}>
        <DataGrid />
        <DataCharts />
      </Suspense>
    </div>
  );
}
