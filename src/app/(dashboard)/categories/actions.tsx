"use client";

import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useOpenCategoryStore } from "@/features/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

export const Actions = ({ id }: { id: string }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this category?",
    "This action cannot be undone."
  );
  const { onOpen } = useOpenCategoryStore();

  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteCategory(id);

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteCategory();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={isDeleting}
            onClick={() => onOpen(id)}
            className="cursor-pointer">
            <Edit className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDeleting}
            onClick={handleDelete}
            className="cursor-pointer"
            variant="destructive">
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog />
    </>
  );
};
