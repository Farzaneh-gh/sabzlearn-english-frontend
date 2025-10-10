import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/admin/Card/Card";
import { Input } from "../../../components/admin/Input/Input";
import { Label } from "../../../components/admin/Label/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/admin/Select/Select";
import { Badge } from "../../../components/admin/Badge/Badge";
import { Switch } from "../../../components/admin/Switch/Switch";
import { Separator } from "../../../components/admin/Separator/Separator";

const PricingSettings = ({
  courseData,
  handleInputChange,
  thumbnailPreview,
}) => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>Set the price for your course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Course Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="99"
                value={courseData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Course Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="20"
                value={courseData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={courseData.language}
                onValueChange={(value) => handleInputChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publication Settings</CardTitle>
            <CardDescription>Control how your course appears</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Publish Course</Label>
                <p className="text-sm text-muted-foreground">
                  Make this course visible to students
                </p>
              </div>
              <Switch
                checked={courseData.published}
                onCheckedChange={(checked) =>
                  handleInputChange("published", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Featured Course</Label>
                <p className="text-sm text-muted-foreground">
                  Highlight this course on the homepage
                </p>
              </div>
              <Switch
                checked={courseData.featured}
                onCheckedChange={(checked) =>
                  handleInputChange("featured", checked)
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Course Preview</CardTitle>
          <CardDescription>
            How your course will appear to students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto border rounded-lg overflow-hidden">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="Course preview"
                className="w-full h-32 object-cover"
              />
            ) : (
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm">Course Thumbnail</span>
              </div>
            )}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold">
                {courseData.title || "Course Title"}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {courseData.shortDescription ||
                  "Course description will appear here..."}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  {courseData.category || "Category"}
                </Badge>
                <span className="font-bold">${courseData.price || "99"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PricingSettings;
