"use client";

import { format } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatAmount } from "@/lib/utils";

import { CustomTooltip } from "@/components/charts/tooltips/custom-tooltip";

type Props = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const AreaVariant = ({ data = [] }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#3d82bf" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3d82bf" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="income"
          stackId="income"
          strokeWidth={2}
          stroke="#3d82bf"
          fill="url(#income)"
          fillOpacity={0.2}
          className="drop-shadow-sm"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stackId="expenses"
          strokeWidth={2}
          stroke="#f43f5e"
          fill="url(#expenses)"
          fillOpacity={0.2}
          className="drop-shadow-sm"
        />
        <Tooltip content={<CustomTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
