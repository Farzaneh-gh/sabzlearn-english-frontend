import { useState } from "react";
import { ArrowLeft, Upload, Plus, X, Save, Eye } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/admin/Tabs/Tabs";

export function AddCoursePage() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "",
    level: "",
    price: "",
    duration: "",
    language: "English",
    tags: [],
    published: false,
    featured: false,
  });

  const [newTag, setNewTag] = useState("");
  const [lessons, setLessons] = useState([
    { id: 1, title: "", duration: "", description: "" },
  ]);

  const handleInputChange = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !courseData.tags.includes(newTag.trim())) {
      setCourseData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setCourseData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addLesson = () => {
    setLessons((prev) => [
      ...prev,
      { id: Date.now(), title: "", duration: "", description: "" },
    ]);
  };

  const removeLesson = (id) => {
    setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
  };

  const updateLesson = (id, field, value) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  const handleSave = (isDraft) => {
    console.log("Saving course:", { ...courseData, lessons, isDraft });
    // ارسال به backend
  };

  return (
    <div className="w-full max-w-full space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl ">
      {/* Header */}
      <div className="flex items-center justify-between flex-col xs:flex-row gap-y-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-300">
            Create New Course
          </h2>
          <p className="mt-1 text-zinc-700 dark:text-zinc-400">
            Build and publish your educational content
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={() => handleSave(true)}>
            <Save className="h-4 w-4 mr-1 shrink-0" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave(false)}>
            <Eye className="h-4 w-4 mr-1 shrink-0" />
            Publish Course
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6 ">
        <TabsList className="flex flex-col md:flex-row py-2 md:py-0">
          <TabsTrigger value="basic" className="flex-shrink-0 min-w-[150px]">
            Basic Information
          </TabsTrigger>
          <TabsTrigger value="content" className="flex-shrink-0 min-w-[150px]">
            Course Content
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex-shrink-0 min-w-[150px]">
            Pricing & Settings
          </TabsTrigger>
        </TabsList>

        {/* ================= BASIC ================= */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Course Thumbnail */}
            <Card>
              <CardHeader>
                <CardTitle>Course Thumbnail</CardTitle>
                <CardDescription>
                  Upload an attractive thumbnail for your course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 2MB (Recommended: 1280x720)
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Basic Details */}
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
                <CardDescription>
                  Basic information about your course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter course title"
                    value={courseData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    placeholder="Brief description for course cards"
                    value={courseData.shortDescription}
                    onChange={(e) =>
                      handleInputChange("shortDescription", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="data-science">
                          Data Science
                        </SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Difficulty Level</Label>
                    <Select
                      value={courseData.level}
                      onValueChange={(value) =>
                        handleInputChange("level", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Full-width Description */}
          <Card>
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
              <CardDescription>
                Detailed description of what students will learn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Provide a comprehensive description of your course..."
                value={courseData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Course Tags</CardTitle>
              <CardDescription>
                Add relevant tags to help students find your course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button type="button" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {courseData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {courseData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= CONTENT ================= */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                Structure your course content into lessons
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="space-y-4 p-4 border rounded-lg"
                >
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
        </TabsContent>

        {/* ================= PRICING ================= */}
        <TabsContent value="pricing" className="space-y-6">
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
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={courseData.language}
                    onValueChange={(value) =>
                      handleInputChange("language", value)
                    }
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
                <CardDescription>
                  Control how your course appears
                </CardDescription>
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
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm">Course Thumbnail</span>
                </div>
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
                    <span className="font-bold">
                      ${courseData.price || "99"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
