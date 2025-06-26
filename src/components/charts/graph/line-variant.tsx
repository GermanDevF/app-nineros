import { format } from "date-fns";
import {
  Tooltip,
  XAxis,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
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

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
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
        <Line
          dot={false}
          dataKey="income"
          fill="#3d82bf"
          className="drop-shadow-sm"
          strokeWidth={2}
        />
        <Line
          dot={false}
          dataKey="expenses"
          fill="#f43f5e"
          radius={2}
          className="drop-shadow-sm"
          strokeWidth={2}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};
