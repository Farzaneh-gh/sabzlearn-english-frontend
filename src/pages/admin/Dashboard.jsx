import { Plus, Eye } from "lucide-react";
import { Button } from "../../components/admin/Button/Button";
import { useDashboardData } from "../../hooks/useDashboardData";
import { DashboardSkeleton } from "../../components/skeletons/DashboardSkeleton";
import { StatCards } from "../../components/admin/dashboard/StatCards";
import { RecentStudents } from "../../components/admin/dashboard/RecentStudents";
import { EnrollmentChart } from "../../components/admin/dashboard/EnrollmentChart";
import { TopCourses } from "../../components/admin/dashboard/TopCourses";
import { CompletionRates } from "../../components/admin/dashboard/CompletionRates";
import { Link } from "react-router-dom";

const chartConfig = {
  enrollments: { label: "Enrollments", color: "hsl(var(--chart-1))" },
  revenue: { label: "Revenue ($)", color: "hsl(var(--chart-2))" },
};

export default function Dashboard() {
  const {
    stats,
    latestUsers,
    topCourses,
    enrollmentData,
    courseCompletionData,
    loading,
    error,
  } = useDashboardData();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-300">
            Dashboard
          </h2>
          <p className="mt-1 text-zinc-700 dark:text-zinc-400">
            Monitor your course platform performance and student engagement
          </p>
        </div>
        <div className="flex items-center space-x-3 text-zinc-800 dark:text-zinc-200">
          <Button variant="outline" size="md">
            <Eye className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button size="md">
            <Plus className="h-4 w-4 mr-2" />
            <Link to="/admin/add-course">Add New Course</Link>
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <StatCards stats={stats} />

      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-8">
        <RecentStudents users={latestUsers} />
        <EnrollmentChart data={enrollmentData} config={chartConfig} />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <TopCourses courses={topCourses} />
        <CompletionRates data={courseCompletionData} />
      </div>
    </div>
  );
}
