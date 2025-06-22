import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

type Props = {
  columnIndex: number;
  selectedColumns: Record<number, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const OPTIONS = ["skip", "amount", "date", "payee", "notes"];

export const TableHeadSelect = ({
  columnIndex,
  selectedColumns,
  onChange,
}: Props) => {
  const currentSelectedColumn = selectedColumns[columnIndex] ?? null;

  return (
    <div
      className={cn(
        "flex items-center gap-x-2",
        currentSelectedColumn && "bg-muted"
      )}>
      <Select
        value={currentSelectedColumn || ""}
        onValueChange={(value) => onChange(columnIndex, value ?? null)}>
        <SelectTrigger
          className={cn(
            "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
            currentSelectedColumn && "text-blue-500"
          )}>
          <SelectValue placeholder="Skip" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          {OPTIONS.map((option) => {
            const isDisabled =
              Object.values(selectedColumns).includes(option) &&
              selectedColumns[columnIndex] !== option;

            return (
              <SelectItem
                key={option}
                value={option}
                disabled={isDisabled}
                className={cn(
                  "capitalize",
                  isDisabled && "text-muted-foreground"
                )}>
                {option}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
