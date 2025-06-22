import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewCategoryStore } from "@/features/categories/hooks/use-new-category";
import {
  CategoryForm,
  FormValues,
} from "@/features/categories/components/category-form";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategoryStore();

  const createCategory = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    createCategory.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to track your finances.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          onDelete={() => {}}
          disabled={createCategory.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
