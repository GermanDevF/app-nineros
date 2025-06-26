import {
  Cell,
  Legend,
  LegendPayload,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatAmount } from "@/lib/utils";

import { CategoryTooltip } from "@/components/charts/tooltips/category-tooltip";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data: {
    name: string;
    value: number;
    percentage: number;
  }[];
};

export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: { payload?: readonly LegendPayload[] }) => {
            if (!payload) return null;

            return (
              <ul className="flex flex-col space-y-2">
                {payload?.map((entry, index) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center gap-x-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        {entry.value}
                      </div>
                      <div className="text-xs">
                        {formatAmount(entry.payload?.value ?? 0)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          labelLine={false}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CategoryTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};
