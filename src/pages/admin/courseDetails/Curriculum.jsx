import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/admin/Card/Card";
import { Badge } from "../../../components/admin/Badge/Badge";
import { Progress } from "../../../components/admin/Progress/Progress";
import { Clock, Users } from "lucide-react";
const Curriculum = ({ course }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Curriculum</CardTitle>
        <CardDescription>
          {course.lessons.length} lessons • {course.duration}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {course.lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="flex flex-col xs:flex-row gap-y-2 items-center space-x-4 p-4 border rounded-lg"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{lesson.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {lesson.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{lesson.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{lesson.completed} completed</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {Math.round((lesson.completed / course.students) * 100)}%
                </div>
                <Progress
                  value={(lesson.completed / course.students) * 100}
                  className="h-2 w-20"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Curriculum