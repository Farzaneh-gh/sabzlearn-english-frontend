import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Card/Card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../Chart/Chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export function EnrollmentChart({ data, config }) {
  return (
    <Card className="col-span-7 md:col-span-4">
      <CardHeader>
        <CardTitle>Enrollment & Revenue Trends</CardTitle>
        <CardDescription>Monthly performance overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="enrollments" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-enrollments)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-enrollments)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="enrollments"
                stroke="var(--color-enrollments)"
                fillOpacity={1}
                fill="url(#enrollments)"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                fillOpacity={1}
                fill="url(#revenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
