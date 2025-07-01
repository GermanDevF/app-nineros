import { Suspense } from "react";

import { FiltersSk } from "@/components/skelletons/filters-sk";

import { AccountFilter } from "@/components/account-filter";
import { DateFilter } from "@/components/date-filter";

export const Filters = async () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
      <Suspense
        fallback={
          <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
            <FiltersSk />
            <FiltersSk />
          </div>
        }
      >
        <AccountFilter />
        <DateFilter />
      </Suspense>
    </div>
  );
};
