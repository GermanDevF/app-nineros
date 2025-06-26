import { AreaChart, BarChart3, FileSearch, LineChart } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { AreaVariant } from "@/components/area-variant";
import { BarVariant } from "@/components/bar-variant";
import { LineVariant } from "@/components/line-variant";

type Props = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

type Variant = "area" | "bar" | "line";

export const Chart = ({ data = [] }: Props) => {
  const [variant, setVariant] = useState<Variant>("area");

  const onTypeChange = (type: Variant) => {
    setVariant(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select value={variant} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center gap-x-2">
                <AreaChart className="size-4 shrink-0" />
                <div className="line-clamp-1">Area chart</div>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center gap-x-2">
                <BarChart3 className="size-4 shrink-0" />
                <div className="line-clamp-1">Bar chart</div>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center gap-x-2">
                <LineChart className="size-4 shrink-0" />
                <div className="line-clamp-1">Line chart</div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px]">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No transactions found
            </p>
          </div>
        ) : (
          <>
            {variant === "area" && <AreaVariant data={data} />}
            {variant === "bar" && <BarVariant data={data} />}
            {variant === "line" && <LineVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};
