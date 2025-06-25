"use client";

import { useState, Suspense } from "react";
import { Loader2, PlusIcon } from "lucide-react";

import { transactions } from "@/db/schema";

import { DataTable } from "@/components/data-table";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useNewTransactionStore } from "@/features/transactions/hooks/use-new-transaction";
import { columns } from "./columns";
import { ImportCard } from "./import-card";
import { INITIAL_IMPORT_RESULTS, UploadButton } from "./upload-button";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

function TransactionsPageContent() {
  const [SelectAccountDialog, selectAccount] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState<
    typeof INITIAL_IMPORT_RESULTS
  >(INITIAL_IMPORT_RESULTS);
  const newTransaction = useNewTransactionStore();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactionsQuery = useGetTransactions();
  const bulkCreateTransactions = useBulkCreateTransactions();

  const onUpload = (data: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT);
    setImportResults(data);
  };

  const onCancelImport = () => {
    setVariant(VARIANTS.LIST);
    setImportResults(INITIAL_IMPORT_RESULTS);
  };

  const onSubmitImport = async (
    values: (typeof transactions.$inferInsert)[]
  ) => {
    const accountId = await selectAccount();

    if (!accountId) {
      toast.error("Please select an account");
      return;
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    bulkCreateTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  const isDisabled =
    deleteTransactions.isPending || deleteTransactions.isPending;

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <SelectAccountDialog />
        <ImportCard
          data={importResults.data}
          onSubmit={onSubmitImport}
          onCancel={onCancelImport}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex flex-col gap-y-2 lg:flex-row md:justify-between">
          <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
          <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-2 items-center w-full lg:w-auto">
            <Button
              size="sm"
              className="w-full lg:w-auto"
              onClick={() => newTransaction.onOpen()}>
              <PlusIcon className="size-4" />
              Add new transaction
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactionsQuery.data ?? []}
            filterKey="payee"
            onDelete={(deletedRows) => {
              deleteTransactions.mutate({
                ids: deletedRows.map((row) => row.id),
              });
            }}
            disabled={isDisabled || transactionsQuery.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
          <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full flex items-center justify-center">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      }>
      <TransactionsPageContent />
    </Suspense>
  );
}
