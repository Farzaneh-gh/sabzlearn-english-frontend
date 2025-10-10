import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Card/Card";
import { Button } from "../Button/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import { Clock } from "lucide-react";

export function RecentStudents({ users }) {
  return (
    <Card className=" col-span-7 md:col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-semibold">
          Recent Students
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardTitle>
        <CardDescription>
          Latest student registrations and activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "default"
                        : user.status === "pending"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {user.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{user.coursesEnrolled} courses enrolled</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {user.lastActive}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
