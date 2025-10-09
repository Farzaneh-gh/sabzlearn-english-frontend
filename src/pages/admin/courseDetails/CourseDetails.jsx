import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/admin/Card/Card";
import {
  ArrowLeft,
  Users,
  Star,
  Clock,
  Calendar,
  Play,
  BookOpen,
  Award,
  DollarSign,
  Edit,
  Trash2,
  Share2,
  Edit2,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../../../redux/slices/coursesSlice";
import { useParams } from "react-router-dom";
import { Badge } from "../../../components/admin/Badge/Badge";
import { Button } from "../../../components/admin/Button/Button";
import {
  TabsList,
  TabsTrigger,
  Tabs,
} from "../../../components/admin/Tabs/Tabs";
import Curriculum from "./Curriculum";
import Students from "./Students";
import Analytics from "./Analytics";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/admin/Avatar/Avatar";
import { TabsContent } from "@radix-ui/react-tabs";
function CourseDetails() {
  const { courseId } = useParams();
  const { selectedCourse, loading, error } = useSelector(
    (state) => state.courses
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    // Fetch course details when component mounts
    dispatch(fetchCourseById(courseId));
  }, [dispatch, courseId]);

  // Loading State
  if (loading) {
    return (
      <div className="w-full max-w-full space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="w-full max-w-full space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                  Failed to Load Course
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
              <Button onClick={() => dispatch(fetchCourseById(courseId))}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // No Course Found
  if (!selectedCourse) {
    return (
      <div className="w-full max-w-full space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                  Course Not Found
                </h3>
                <p className="text-sm text-muted-foreground">
                  The course you're looking for doesn't exist or has been
                  removed.
                </p>
              </div>
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl ">
      <div className="block lg:flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-300">
            {selectedCourse?.title}
          </h2>
          <p className="mt-1 text-zinc-700 dark:text-zinc-400">
            Course Details and Analytics
          </p>
        </div>

        <div className="flex flex-col gap-x-3 xs:flex-row gap-y-3 space-x-3 text-zinc-800 dark:text-zinc-200 justify-end mt-4 lg:mt-0">
          <Button variant="outline" className="mr-0">
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Course
          </Button>
          <Button>
            <Trash2 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-7 mt-8">
        <Card className="xl:col-span-5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start space-x-6">
              <div className="w-full lg:w-1/3 mb-6">
                <img
                  src={selectedCourse?.image}
                  alt={selectedCourse?.title}
                  className="w-full h-48 rounded-lg object-cover "
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={
                      selectedCourse?.status === "published"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedCourse?.status}
                  </Badge>
                  <Badge variant="outline">{selectedCourse?.category}</Badge>
                  <Badge variant="outline">
                    {selectedCourse?.level || "Beginner"}
                  </Badge>
                </div>
                <p>
                  {selectedCourse?.description || "No description available."}
                </p>
                <div>
                  {selectedCourse?.tags &&
                    selectedCourse.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="mr-2 mb-2">
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader>Quick Stats</CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Students</span>
              </div>
              <span className="font-semibold">
                {selectedCourse?.students.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Rating</span>
              </div>
              <span className="font-semibold">{selectedCourse.rating}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Revenue</span>
              </div>
              <span className="font-semibold">
                ${selectedCourse.revenue.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Completion</span>
              </div>
              <span className="font-semibold">
                {selectedCourse.completion}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="p-4">
        <CardTitle>Instructor</CardTitle>
        <CardContent className=" flex flex-col md:flex-row items-center justify-center">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={selectedCourse?.instructorImage}
              alt={selectedCourse?.instructor}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              {selectedCourse?.instructor.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left md:ml-6 mt-4 md:mt-0">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              {selectedCourse?.instructor}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {selectedCourse?.instructorBio ||
                "No bio available for this instructor."}
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="curriculum" className="space-y-6">
        <TabsList className="flex flex-col xs:flex-row">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="curriculum" className="space-y-6">
          <Curriculum course={selectedCourse} />
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Students recentStudents={selectedCourse?.recentStudents} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
            <Analytics course={selectedCourse} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CourseDetails;
