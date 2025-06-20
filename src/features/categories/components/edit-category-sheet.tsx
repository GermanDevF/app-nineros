import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useConfirm } from "@/hooks/use-confirm";

import { FormValues } from "@/features/categories/components/category-form";
import { useOpenCategoryStore } from "@/features/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { CategoryForm } from "@/features/categories/components/category-form";

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategoryStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this category?",
    "This action cannot be undone."
  );

  const categoryQuery = useGetCategory(id);
  const { mutate: updateCategory, isPending } = useEditCategory();
  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteCategory(id);

  const isLoading = categoryQuery.isLoading || isPending || isDeleting;

  const onSubmit = (values: FormValues) => {
    updateCategory(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteCategory(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>
              Edit the category to track your finances.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CategoryForm
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
