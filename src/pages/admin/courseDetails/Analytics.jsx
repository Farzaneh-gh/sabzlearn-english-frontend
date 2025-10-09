import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/admin/Card/Card";
import { Progress } from "../../../components/admin/Progress/Progress";
import { Separator } from "../../../components/admin/Separator/Separator";
function Analytics({ course }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
          <CardDescription>Key metrics and trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Enrollment Rate</span>
              <span className="font-medium">+18.2%</span>
            </div>
            <Progress value={82} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Rate</span>
              <span className="font-medium">{course.completionRate}%</span>
            </div>
            <Progress value={course.completionRate} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Student Satisfaction</span>
              <span className="font-medium">{course.rating}/5.0</span>
            </div>
            <Progress value={(course.rating / 5) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>Financial performance overview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold">${course.price}</div>
              <div className="text-xs text-muted-foreground">Course Price</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                ${Math.round(course.revenue / course.students)}
              </div>
              <div className="text-xs text-muted-foreground">Avg. Revenue</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Total Revenue</span>
              <span className="font-semibold">
                ${course.revenue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Monthly Growth</span>
              <span className="font-semibold text-green-600">+12.4%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Analytics