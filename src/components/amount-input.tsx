import CurrencyInput from "react-currency-input-field";
import { Info, MinusCircle, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
};

export const AmountInput = ({
  value,
  onChange,
  disabled,
  placeholder,
}: Props) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = (value: string) => {
    if (!value) return;
    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className={cn(
                "bg-slate-400 text-white absolute top-1 left-1 rounded-sm p-2 flex items-center justify-center",
                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                isExpense && "bg-rose-500 hover:bg-rose-600"
              )}
              onClick={() => onReverseValue(value)}>
              {!parsedValue && <Info className="size-3" />}
              {isIncome && <PlusCircle className="size-3" />}
              {isExpense && <MinusCircle className="size-3" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+] to add income and [-] to add expense
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        prefix="$"
        decimalsLimit={2}
        decimalScale={2}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "pl-10 pr-3"
        )}
      />
      <p className="text-xs text-muted-foreground mt-2">
        {isIncome && "This amount counts as income"}
        {isExpense && "This amount counts as expense"}
      </p>
    </div>
  );
};
