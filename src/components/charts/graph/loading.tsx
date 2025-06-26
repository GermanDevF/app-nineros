import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingGraph = () => {
  return (
    <Card className="drop-shadow-none shadow-none w-full">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-48 h-8" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <Loader2 className="size-4 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};
