import { format } from "date-fns";
import {
  Tooltip,
  XAxis,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  BarChart,
  YAxis,
} from "recharts";

import { formatAmount } from "@/lib/utils";

import { CustomTooltip } from "@/components/charts/tooltips/custom-tooltip";

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(new Date(value), "dd MMM")}
          tick={{ fontSize: 12 }}
          tickMargin={16}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatAmount(value)}
          tick={{ fontSize: 12 }}
          tickMargin={16}
        />
        <Bar
          dataKey="income"
          fill="#3d82bf"
          radius={2}
          className="drop-shadow-sm"
        />
        <Bar
          dataKey="expenses"
          fill="#f43f5e"
          radius={2}
          className="drop-shadow-sm"
        />
        <Tooltip content={<CustomTooltip />} />
      </BarChart>
    </ResponsiveContainer>
  );
};
