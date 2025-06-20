import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccountStore } from "../hooks/use-new-accout";
import { AccountForm, FormValues } from "./account-form";
import { useCreateAccount } from "../hooks/use-create-account";

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccountStore();

  const { mutate: createAccount, isPending } = useCreateAccount();

  const onSubmit = (values: FormValues) => {
    createAccount(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your finances.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          onDelete={() => {}}
          disabled={isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
