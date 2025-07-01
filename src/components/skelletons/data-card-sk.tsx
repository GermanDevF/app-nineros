import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const DataCardSk = () => {
  return (
    <Card className="shadow-none drop-shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="flex flex-col gap-y-2">
          <CardTitle className="text-2xl line-clamp-1">
            <Skeleton className="w-1/2 h-4" />
          </CardTitle>
          <CardDescription className="line-clamp-1">
            <Skeleton className="w-1/2 h-4" />
          </CardDescription>
        </div>
        <div className="">
          <Skeleton className="w-10 h-10" />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
          <Skeleton className="w-1/2 h-4" />
        </h1>
        <p className={cn("text-sm text-muted-foreground line-clamp-1")}>
          <Skeleton className="w-1/2 h-4" />
        </p>
      </CardContent>
    </Card>
  );
};
