import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Card/Card";
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Star,
  Clock,
  DollarSign,
} from "lucide-react";

const StatCard = ({ title, value, icon, description, gradient }) => (
  <Card className="relative overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="flex items-center space-x-1">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-green-600 flex items-center my-2">
        {description}
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
      title: "Total Courses",
      value: `$${stats.totalCourses.toLocaleString()}`,
      icon: <Eye className="h-4 w-4 text-muted-foreground" />,
      description: "4 published",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      description: "From course sales\n\n",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Students",
      value: `${stats.totalStudents.toLocaleString()}`,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      description: `Enrolled across all courses`,
      gradient: "from-purple-500 to-violet-500",
    },
    {
      title: "Average Rating",
      value: stats.averageRating,
      icon: <Star className="h-4 w-4 text-muted-foreground" />,
      description: `+${stats.ratingGrowth} from last month`,
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
