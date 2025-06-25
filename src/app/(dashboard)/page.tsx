import { Suspense } from "react";
import { DataGrid } from "@/components/data-grid";

export default function Dashboard() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Suspense fallback={<div>Loading...</div>}>
        <DataGrid />
      </Suspense>
    </div>
  );
}
