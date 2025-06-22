import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useConfirm } from "@/hooks/use-confirm";

import { InsertTransaction } from "@/db/schema";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/hooks/use-create-account";

import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetCategory } from "@/features/categories/api/use-get-category";

import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { useOpenTransactionStore } from "@/features/transactions/hooks/use-open-transaction";

import { convertAmountFromMiliunits } from "@/lib/utils";
import { TransactionForm } from "./transaction-form";

type ApiFormValues = Omit<InsertTransaction, "id">;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransactionStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this transaction?",
    "This action cannot be undone."
  );

  const transactionQuery = useGetTransaction(id);
  const categoryQuery = useGetCategory(transactionQuery.data?.categoryId ?? "");
  const { mutate: updateTransaction, isPending } = useEditTransaction();
  const { mutate: deleteTransaction, isPending: isDeleting } =
    useDeleteTransaction(id);

  const categoryMutation = useCreateCategory();
  const categoriesQuery = useGetCategories();

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    categoriesQuery.isLoading ||
    accountQuery.isLoading ||
    isPending ||
    isDeleting;

  const isPendingMutations =
    categoryMutation.isPending ||
    accountMutation.isPending ||
    isPending ||
    isDeleting;

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

  const onSubmit = (values: ApiFormValues) => {
    updateTransaction(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteTransaction(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = transactionQuery.data
    ? {
        amount: convertAmountFromMiliunits(
          transactionQuery.data.amount
        ).toString(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
      }
    : {
        amount: "0",
        payee: "",
        notes: "",
        date: new Date(),
        accountId: "",
        categoryId: "",
      };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Edit the transaction to track your finances.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              onDelete={handleDelete}
              disabled={isPendingMutations}
              defaultValues={defaultValues}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
              onCreateCategory={onCreateCategory}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
      <ConfirmDialog />
    </>
  );
};
