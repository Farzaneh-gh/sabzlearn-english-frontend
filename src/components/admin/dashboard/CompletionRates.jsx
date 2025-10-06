import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Card/Card";
import { Progress } from "../Progress/Progress";

export function CompletionRates({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Completion Rates</CardTitle>
        <CardDescription>Average completion by subject</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.course} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.course}</span>
                <span className="text-muted-foreground">
                  {item.completion}%
                </span>
              </div>
              <Progress value={item.completion} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
