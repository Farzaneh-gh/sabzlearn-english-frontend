import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCourseById,
  updateCourse,
} from "../../../redux/slices/coursesSlice";
import { ArrowLeft, Upload, Plus, X, Save, Eye, Trash2 } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/admin/Tabs/Tabs";
import BasicInfo from "./BasicInfo";
import CourseContent from "./CourseContent";
import PricingSettings from "./PricingSettings";

export default function EditCoursePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { selectedCourse, loading, error, success } = useSelector(
    (state) => state.courses
  );

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

  const fileInputRef = useRef(null);
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [newTag, setNewTag] = useState("");
  const [lessons, setLessons] = useState([
    { id: 1, title: "", duration: "", description: "" },
  ]);

  // Fetch course details when component mounts
  useEffect(() => {
    dispatch(fetchCourseById(courseId));
  }, [dispatch, courseId]);

  // Populate form when course data is loaded
  useEffect(() => {
    if (selectedCourse) {
      setCourseData({
        title: selectedCourse.title || "",
        description: selectedCourse.description || "",
        shortDescription: selectedCourse.shortDescription || "",
        category: selectedCourse.category || "",
        level: selectedCourse.level || "Beginner",
        price: selectedCourse.price || "",
        duration: selectedCourse.duration || "",
        language: selectedCourse.language || "English",
        tags: selectedCourse.tags || [],
        published: selectedCourse.status === "published",
        featured: selectedCourse.featured || false,
      });

      // Set thumbnail preview if exists
      if (selectedCourse.image) {
        setThumbnailPreview(selectedCourse.image);
      }

      // Set lessons if exists
      if (selectedCourse.lessons && selectedCourse.lessons.length > 0) {
        setLessons(
          selectedCourse.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title || "",
            duration: lesson.duration || "",
            description: lesson.description || "",
          }))
        );
      }
    }
  }, [selectedCourse]);

  const handleInputChange = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  // Validate uploaded image
  const validateImage = (file) => {
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setUploadError("Please upload only JPG or PNG images");
      return false;
    }

    if (file.size > maxSize) {
      setUploadError("Image size should be less than 2MB");
      return false;
    }

    setUploadError(""); // Clear any previous errors
    return true;
  };

  // Handle image selection and create preview
  const handleImageSelect = (file) => {
    if (validateImage(file)) {
      setCourseThumbnail(file);

      // Create preview using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // File input change handler
  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  // Remove uploaded image
  const handleRemoveThumbnail = () => {
    setCourseThumbnail(null);
    setThumbnailPreview(null);
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Trigger file input click
  const handleChooseFile = () => {
    fileInputRef.current?.click();
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

  const handleSave = async (isDraft) => {
    const formData = new FormData();

    // Add course thumbnail if exists
    if (courseThumbnail) {
      formData.append("thumbnail", courseThumbnail);
    }

    // Add course data
    Object.keys(courseData).forEach((key) => {
      if (key === "tags") {
        formData.append(key, JSON.stringify(courseData[key]));
      } else {
        formData.append(key, courseData[key]);
      }
    });

    // Add lessons
    formData.append("lessons", JSON.stringify(lessons));
    formData.append("isDraft", isDraft);

    try {
      await dispatch(updateCourse({ courseId, courseData: formData })).unwrap();
      // Success - redirect to courses page
      navigate("/admin/courses");
    } catch (err) {
      // Error is handled by Redux slice
      console.error("Failed to update course:", err);
    }
  };

  // Loading State
  if (loading && !selectedCourse) {
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
  if (error && !selectedCourse) {
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

  return (
    <div className="w-full max-w-full space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl ">
      {/* Header */}
      <div className="flex items-center justify-between flex-col xs:flex-row gap-y-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-300">
            Edit Course
          </h2>
          <p className="mt-1 text-zinc-700 dark:text-zinc-400">
            Update your course information and content
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => handleSave(true)}
            disabled={loading}
          >
            <Save className="h-4 w-4 mr-1 shrink-0" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button onClick={() => handleSave(false)} disabled={loading}>
            <Eye className="h-4 w-4 mr-1 shrink-0" />
            {loading ? "Updating..." : "Update Course"}
          </Button>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-200">
            Course created successfully!
          </p>
        </div>
      )}

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
          <BasicInfo
            courseData={courseData}
            handleInputChange={handleInputChange}
            thumbnailPreview={thumbnailPreview}
            isDragging={isDragging}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleChooseFile={handleChooseFile}
            uploadError={uploadError}
            courseThumbnail={courseThumbnail}
            handleRemoveThumbnail={handleRemoveThumbnail}
            fileInputRef={fileInputRef}
            handleFileInputChange={handleFileInputChange}
            newTag={newTag}
            setNewTag={setNewTag}
            addTag={addTag}
            removeTag={removeTag}
          />
        </TabsContent>

        {/* ================= CONTENT ================= */}
        <TabsContent value="content" className="space-y-6">
          <CourseContent
            lessons={lessons}
            updateLesson={updateLesson}
            removeLesson={removeLesson}
            addLesson={addLesson}
          />
        </TabsContent>

        {/* ================= PRICING ================= */}
        <TabsContent value="pricing" className="space-y-6">
          <PricingSettings
            courseData={courseData}
            handleInputChange={handleInputChange}
            thumbnailPreview={thumbnailPreview}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
