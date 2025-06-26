import {
  Legend,
  ResponsiveContainer,
  RadialBar,
  RadialBarChart,
  LegendPayload,
} from "recharts";

import { formatAmount } from "@/lib/utils";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data: {
    name: string;
    value: number;
    percentage: number;
  }[];
};

export const RadialVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        cx="50%"
        cy="30%"
        barSize={10}
        innerRadius="90%"
        outerRadius="40%"
        data={data.map((entry, index) => ({
          ...entry,
          fill: COLORS[index % COLORS.length],
        }))}>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: { payload?: readonly LegendPayload[] }) => {
            if (!payload) return null;

            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry, index) => (
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
        <RadialBar dataKey="value" fill="#8884d8" cornerRadius={10} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
