"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusIcon } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useNewCategoryStore } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete";

export default function CategoriesPage() {
  const newCategory = useNewCategoryStore();
  const deleteCategories = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();

  const isDisabled = deleteCategories.isPending || deleteCategories.isPending;

  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
          <Button
            size="sm"
            className="w-full lg:w-auto"
            onClick={() => newCategory.onOpen()}>
            <PlusIcon className="size-4" />
            Add new category
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categoriesQuery.data ?? []}
            filterKey="name"
            onDelete={(deletedRows) => {
              deleteCategories.mutate({
                ids: deletedRows.map((row) => row.id),
              });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}
