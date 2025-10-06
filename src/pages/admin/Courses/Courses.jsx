import React, { useState } from "react";
import { Button } from "../../../components/admin/Button/Button";
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Star,
  Clock,
  DollarSign,
} from "lucide-react";
import { useCourseData } from "../../../hooks/useCourseData";
import { StatCards } from "../../../components/admin/courses/StatCards";
import { Input } from "../../../components/admin/Input/Input";
import { Badge } from "../../../components/admin/Badge/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/admin/Card/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/admin/Select/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/admin/Table/Table";
import { Link } from "react-router-dom";

// Mock courses data
const coursesData = [
  {
    id: 1,
    title: "Complete React Development Course",
    instructor: "Sarah Chen",
    category: "Frontend",
    students: 1247,
    rating: 4.8,
    price: 99,
    status: "published",
    completion: 87,
    revenue: 123453,
    createdAt: "2024-01-15",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=60&h=60&fit=crop",
  },
  {
    id: 2,
    title: "Advanced JavaScript Masterclass",
    instructor: "Mike Johnson",
    category: "Programming",
    students: 856,
    rating: 4.9,
    price: 129,
    status: "published",
    completion: 92,
    revenue: 110424,
    createdAt: "2024-01-10",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=60&h=60&fit=crop",
  },
  {
    id: 3,
    title: "Python for Data Science",
    instructor: "Emily Davis",
    category: "Data Science",
    students: 734,
    rating: 4.7,
    price: 149,
    status: "published",
    completion: 78,
    revenue: 109366,
    createdAt: "2024-01-08",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=60&h=60&fit=crop",
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    instructor: "Alex Rodriguez",
    category: "Backend",
    students: 623,
    rating: 4.6,
    price: 119,
    status: "draft",
    completion: 65,
    revenue: 74137,
    createdAt: "2024-01-05",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=60&h=60&fit=crop",
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    instructor: "Lisa Wang",
    category: "Design",
    students: 892,
    rating: 4.8,
    price: 89,
    status: "published",
    completion: 85,
    revenue: 79388,
    createdAt: "2024-01-03",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=60&h=60&fit=crop",
  },
];
const Courses = () => {
  const { stats } = useCourseData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredCourses = coursesData.filter((course) => {
    const mathSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "all" || course.status === statusFilter;
    const matchCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    return mathSearch && matchStatus && matchCategory;
  });
  return (
    <div className="w-full max-w-full space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl ">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-y-3 justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-300">
            Courses
          </h2>
          <p className="mt-1 text-zinc-700 dark:text-zinc-400">
            Manage your course catalog and track performance
          </p>
        </div>
        <div>
          <Button size="md" className="px-2">
            {" "}
            <Plus className="h-4 w-4 mr-2" />
            <Link to="/admin/add-course">Add New Course</Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StatCards stats={stats} />

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>
            Search, filter, and manage your courses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute ml-3 mt-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Courses Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium truncate wrap-normal">
                          {course.title}
                        </p>
                        <div className="text-sm text-muted-foreground truncate">
                          Created{" "}
                          {new Date(course.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{course.instructor}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.students}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${course.price}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${course.revenue.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        course.status === "published" ? "default" : "secondary"
                      }
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 ">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Courses;
