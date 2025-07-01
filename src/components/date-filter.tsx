"use client";
import { useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import qs from "query-string";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetSummary } from "@/features/summary/api/use-get-summary";

import { fromatDateRange } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

export const DateFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { isLoading: isSummaryLoading } = useGetSummary();

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const accountId = searchParams.get("accountId");

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (date: DateRange | undefined) => {
    const query = {
      from: format(date?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(date?.to || defaultTo, "yyyy-MM-dd"),
      accountId,
    };

    const queryString = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(queryString);
  };

  const onReset = () => {
    setDate(paramState);
    pushToUrl(paramState);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isSummaryLoading}
          size="sm"
          variant="outline"
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-0 outline-none text-white focus:bg-white/30 transition">
          <span className="">{fromatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <Calendar
          disabled={isSummaryLoading}
          autoFocus
          mode="range"
          defaultMonth={paramState.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="flex items-center justify-end p-4 gap-2">
          <PopoverClose asChild>
            <Button
              className="w-1/2"
              variant="outline"
              size="sm"
              onClick={onReset}
              disabled={!date?.from || !date?.to}>
              Reset
            </Button>
          </PopoverClose>
          <Button
            className="w-1/2"
            size="sm"
            onClick={() => pushToUrl(date)}
            disabled={!date?.from || !date?.to}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
