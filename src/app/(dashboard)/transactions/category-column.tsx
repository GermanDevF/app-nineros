import { Button } from "@/components/ui/button";

import { useOpenCategoryStore } from "@/features/categories/hooks/use-open-category";
import { useOpenTransactionStore } from "@/features/transactions/hooks/use-open-transaction";

import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type CategoryColumnProps = {
  categoryId: string | null;
  category: string | null;
  id: string;
};

export const CategoryColumn = ({
  categoryId,
  category,
  id,
}: CategoryColumnProps) => {
  const { onOpen: onOpenCategory } = useOpenCategoryStore();
  const { onOpen: onOpenTransaction } = useOpenTransactionStore();

  const onClick = () => {
    if (!categoryId) {
      onOpenTransaction(id);
      return;
    }

    onOpenCategory(categoryId);
  };

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}>
      <Button variant="ghost" size="icon" onClick={onClick}>
        {!category && (
          <TriangleAlert className="size-4 text-rose-500 shrink-0" />
        )}
        {category || "Uncategorized"}
      </Button>
    </div>
  );
};
