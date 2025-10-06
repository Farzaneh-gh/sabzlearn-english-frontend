import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Card/Card";
import { Progress } from "../Progress/Progress";
import { Star } from "lucide-react";

export function TopCourses({ courses }) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Top Performing Courses</CardTitle>
        <CardDescription>
          Best courses by enrollment and completion rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="flex items-center space-x-4 p-4 rounded-lg border bg-card/50"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium leading-tight">
                      {course.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      by {course.instructor}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${course.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {course.students} students
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Completion:</span>
                    <span className="font-medium">{course.completion}%</span>
                  </div>
                </div>
                <Progress value={course.completion} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
