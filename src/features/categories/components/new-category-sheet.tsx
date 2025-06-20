import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewCategoryStore } from "../hooks/use-new-category";
import { CategoryForm, FormValues } from "./category-form";
import { useCreateCategory } from "../hooks/use-create-category";

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategoryStore();

  const { mutate: createCategory, isPending } = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    createCategory(values, {
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
        <CategoryForm
          onSubmit={onSubmit}
          onDelete={() => {}}
          disabled={isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
