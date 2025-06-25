import { IconType } from "react-icons";
import { VariantProps, cva } from "class-variance-authority";

import { cn, formatAmount, formatPercentage } from "@/lib/utils";
import { CountUp } from "@/components/count-up";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const boxVariant = cva("rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/10",
      success: "bg-emerald-500/10",
      danger: "bg-rose-500/10",
      warning: "bg-yellow-500/10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariants = cva("size-6", {
  variants: {
    variant: {
      default: "text-blue-500",
      success: "text-emerald-500",
      danger: "text-rose-500",
      warning: "text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariants>;

interface Props extends BoxVariants, IconVariants {
  icon: IconType;
  title: string;
  value?: number;
  dateRange: string;
  change?: number;
}

export const DataCard = ({
  title,
  value = 0,
  change = 0,
  icon: Icon,
  variant,
  dateRange,
}: Props) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="flex flex-col gap-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn("shrink-0", boxVariant({ variant }))}>
          <Icon className={cn(iconVariants({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
          <CountUp
            preserveValue
            end={value}
            duration={1}
            start={0}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatAmount}
          />
        </h1>
        <p
          className={cn(
            "text-sm text-muted-foreground line-clamp-1",
            change > 0 && "text-emerald-500",
            change < 0 && "text-rose-500"
          )}>
          {formatPercentage(change, { addPrefix: true })} from last period
        </p>
      </CardContent>
    </Card>
  );
};
