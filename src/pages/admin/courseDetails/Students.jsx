import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/admin/Card/Card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/admin/Avatar/Avatar";
import { Progress } from "../../../components/admin/Progress/Progress";

function Students({ recentStudents }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Students</CardTitle>
        <CardDescription>Latest enrollments and their progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentStudents.map((student, index) => (
            <div
              key={index}
              className="flex flex-col xs:flex-row items-center space-x-4"
            >
              <Avatar>
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-muted-foreground">
                  Joined {new Date(student.joinedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{student.progress}%</div>
                <Progress value={student.progress} className="h-2 w-20" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Students;
