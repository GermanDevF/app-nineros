import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const RadarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="60%">
        <PolarGrid />
        <PolarAngleAxis dataKey="name" style={{ fontSize: 12 }} />
        <PolarRadiusAxis style={{ fontSize: 12 }} />
        <Radar
          dataKey="value"
          fill="#3b82f6"
          stroke="#3b82f6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
