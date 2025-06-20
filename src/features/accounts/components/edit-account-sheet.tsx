import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useConfirm } from "@/hooks/use-confirm";

import {
  AccountForm,
  FormValues,
} from "@/features/accounts/components/account-form";
import { useOpenAccountStore } from "@/features/accounts/hooks/use-open-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccountStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this account?",
    "This action cannot be undone."
  );

  const accountQuery = useGetAccount(id);
  const { mutate: updateAccount, isPending } = useEditAccount();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount(id);

  const isLoading = accountQuery.isLoading || isPending || isDeleting;

  const onSubmit = (values: FormValues) => {
    updateAccount(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteAccount(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>
              Edit the account to track your finances.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              onDelete={handleDelete}
              disabled={isPending || isDeleting}
              defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
      <ConfirmDialog />
    </>
  );
};
