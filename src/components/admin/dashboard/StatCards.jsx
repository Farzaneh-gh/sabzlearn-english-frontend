import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Card/Card";
import { DollarSign, Users, Award, Star, ArrowUpRight } from "lucide-react";

const StatCard = ({ title, value, icon, growth, gradient }) => (
  <Card className="relative overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="flex items-center space-x-1">
        <ArrowUpRight className="h-3 w-3 text-green-500" />
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-green-600 flex items-center my-2">
        <ArrowUpRight className="h-3 w-3 mr-1" />
        {growth}
      </p>
    </CardContent>
    <div
      className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`}
    />
  </Card>
);

export function StatCards({ stats }) {
  const cards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      growth: `+${stats.revenueGrowth}% from last month`,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Active Students",
      value: stats.activeStudents.toLocaleString(),
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      growth: `+${stats.newStudents} new this month`,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Course Completion",
      value: `${stats.courseCompletion}%`,
      icon: <Award className="h-4 w-4 text-muted-foreground" />,
      growth: `+${stats.completionGrowth}% from last month`,
      gradient: "from-purple-500 to-violet-500",
    },
    {
      title: "Average Rating",
      value: stats.averageRating,
      icon: <Star className="h-4 w-4 text-muted-foreground" />,
      growth: `+${stats.ratingGrowth} from last month`,
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
