import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import { UpdateTransaction } from "@/db/schema";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useNewTransactionStore } from "@/features/transactions/hooks/use-new-transaction";
import { Loader2 } from "lucide-react";

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransactionStore();

  const createTransaction = useCreateTransaction();

  const categoryMutation = useCreateCategory();
  const categoriesQuery = useGetCategories();

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const isPending =
    categoryMutation.isPending ||
    accountMutation.isPending ||
    createTransaction.isPending;

  const isLoading = categoriesQuery.isLoading || accountQuery.isLoading;

  const onCreateAccount = (name: string) => {
    accountMutation.mutate({ name });
  };

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({ name });
  };

  const categoryOptions = (categoriesQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const onSubmit = (values: UpdateTransaction) => {
    createTransaction.mutate(
      {
        date: values.date ?? new Date(),
        amount: values.amount?.toString() ?? "0",
        payee: values.payee ?? "",
        accountId: values.accountId ?? "",
        categoryId: values.categoryId,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Create a new transaction to track your finances.
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            onDelete={() => {}}
            disabled={isPending}
            categoryOptions={categoryOptions}
            accountOptions={accountOptions}
            onCreateCategory={onCreateCategory}
            onCreateAccount={onCreateAccount}
            defaultValues={{
              amount: "",
              payee: "",
              notes: "",
              date: new Date(),
              accountId: "",
              categoryId: "",
            }}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
