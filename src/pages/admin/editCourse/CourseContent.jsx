import React from "react";
import { Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/admin/Card/Card";
import { Button } from "../../../components/admin/Button/Button";
import { Input } from "../../../components/admin/Input/Input";
import { Label } from "../../../components/admin/Label/Label";
import { Textarea } from "../../../components/admin/Textarea/Textarea";

const CourseContent = ({ lessons, updateLesson, removeLesson, addLesson }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Curriculum</CardTitle>
        <CardDescription>
          Structure your course content into lessons
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Lesson {index + 1}</h4>
              {lessons.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLesson(lesson.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Lesson Title</Label>
                <Input
                  placeholder="Enter lesson title"
                  value={lesson.title}
                  onChange={(e) =>
                    updateLesson(lesson.id, "title", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  placeholder="30"
                  value={lesson.duration}
                  onChange={(e) =>
                    updateLesson(lesson.id, "duration", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Lesson Description</Label>
              <Textarea
                placeholder="Describe what this lesson covers..."
                value={lesson.description}
                onChange={(e) =>
                  updateLesson(lesson.id, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addLesson}>
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseContent;
