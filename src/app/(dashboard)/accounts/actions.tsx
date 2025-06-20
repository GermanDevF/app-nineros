"use client";

import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useOpenAccountStore } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

export const Actions = ({ id }: { id: string }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this account?",
    "This action cannot be undone."
  );
  const { onOpen } = useOpenAccountStore();

  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount(id);

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteAccount();
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
