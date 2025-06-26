import { FileSearch, PieChartIcon, Radar, Target } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieVariant } from "@/components/charts/pie/pie-variant";
import { RadarVariant } from "@/components/charts/pie/radar-variant";
import { RadialVariant } from "@/components/charts/pie/radial-variant";

type Props = {
  data:
    | {
        name: string;
        value: number;
        percentage: number;
      }[]
    | undefined;
};

type Variant = "pie" | "radar" | "radial";

export const SpendingPie = ({ data = [] }: Props) => {
  const [variant, setVariant] = useState<Variant>("pie");

  const onTypeChange = (type: Variant) => {
    setVariant(type);
  };

  return (
    <Card className="drop-shadow-none shadow-none">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
        <Select value={variant} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center gap-x-2">
                <PieChartIcon className="size-4 shrink-0" />
                <div className="line-clamp-1">Pie chart</div>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center gap-x-2">
                <Radar className="size-4 shrink-0" />
                <div className="line-clamp-1">Radar chart</div>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center gap-x-2">
                <Target className="size-4 shrink-0" />
                <div className="line-clamp-1">Radial chart</div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px]">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No categories found</p>
          </div>
        ) : (
          <>
            {variant === "pie" && <PieVariant data={data} />}
            {variant === "radar" && <RadarVariant data={data} />}
            {variant === "radial" && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};
