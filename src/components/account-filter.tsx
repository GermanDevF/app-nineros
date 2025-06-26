"use client";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

import { useGetSummary } from "@/features/summary/api/use-get-summary";

export const AccountFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const accountId = searchParams.get("accountId") || "all";

  const { isLoading: isSummaryLoading } = useGetSummary();

  const { data: accounts, isLoading } = useGetAccounts();

  const onChange = (value: string) => {
    const query = {
      accountId: value,
      from,
      to,
    };

    if (value === "all") {
      query.accountId = "";
    }

    const queryString = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(queryString);
  };

  return (
    <Select
      defaultValue={accountId}
      value={accountId}
      onValueChange={onChange}
      disabled={isLoading || isSummaryLoading}>
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-0 outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Select an account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
