'use client';
import { TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ChartTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="min-w-[8rem] rounded-lg border border-border/50 bg-background p-2.5 text-sm shadow-lg transition-all">
        <div className="grid gap-1.5">
          <p className="font-medium text-muted-foreground">{label}</p>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FD4102]" />
            <p className="font-semibold text-foreground">{payload[0].value.toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export const Chart = ({
  chartData,
  title,
  description,
  footerText,
  footerDescription,
}) => {
  return (
    <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(253, 65, 2, 0.4)" />
                  <stop offset="95%" stopColor="rgba(253, 65, 2, 0)" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--muted))"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                cursor={{
                    stroke: "#FD4102",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                }}
                content={<ChartTooltipContent />}
              />
              <Area
                dataKey="desktop"
                type="natural"
                stroke="#FD4102"
                strokeWidth={3}
                fill="url(#chart-gradient)"
                fillOpacity={1}
                dot={{
                    fill: "#FD4102",
                    r: 4,
                }}
                activeDot={{
                    r: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-semibold leading-none text-green-500">
          {footerText} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  );
};
