import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/admin/Card/Card";
import { Input } from "../../../components/admin/Input/Input";
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/admin/Table/Table";
import { Skeleton } from "../../../components/admin/Skeleton/Skeleton";
import {
  Search,
  Filter,
  BookOpen,
  Trophy,
  Calendar,
  Clock,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/admin/Avatar/Avatar";
import { Badge } from "../../../components/admin/Badge/Badge";
import { Progress } from "../../../components/admin/Progress/Progress";
import { Button } from "../../../components/admin/Button/Button";
import { MoreHorizontal, Mail, Phone } from "lucide-react";
import { Edit, Eye, Trash2 } from "lucide-react";

// Mock students data
const studentsData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=32&h=32&fit=crop&crop=face",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2 hours ago",
    coursesEnrolled: 3,
    coursesCompleted: 2,
    totalSpent: 347,
    progress: 85,
    country: "United States",
    courses: ["React Basics", "Advanced JavaScript", "Node.js"],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 (555) 234-5678",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
    status: "active",
    joinDate: "2024-01-14",
    lastLogin: "1 day ago",
    coursesEnrolled: 2,
    coursesCompleted: 1,
    totalSpent: 228,
    progress: 65,
    country: "Canada",
    courses: ["Python Basics", "Data Science"],
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    phone: "+1 (555) 345-6789",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    status: "inactive",
    joinDate: "2024-01-13",
    lastLogin: "1 week ago",
    coursesEnrolled: 1,
    coursesCompleted: 0,
    totalSpent: 99,
    progress: 25,
    country: "United Kingdom",
    courses: ["UI/UX Design"],
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1 (555) 456-7890",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    status: "active",
    joinDate: "2024-01-12",
    lastLogin: "3 hours ago",
    coursesEnrolled: 4,
    coursesCompleted: 3,
    totalSpent: 486,
    progress: 92,
    country: "Australia",
    courses: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    id: 5,
    name: "Emily Brown",
    email: "emily@example.com",
    phone: "+1 (555) 567-8901",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face",
    status: "active",
    joinDate: "2024-01-11",
    lastLogin: "5 minutes ago",
    coursesEnrolled: 2,
    coursesCompleted: 1,
    totalSpent: 218,
    progress: 78,
    country: "Germany",
    courses: ["Python", "Machine Learning"],
  },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalStudents = studentsData.length;
  const activeStudents = studentsData.filter(
    (s) => s.status === "active"
  ).length;
  const totalRevenue = studentsData.reduce(
    (sum, student) => sum + student.totalSpent,
    0
  );
  const averageProgress =
    studentsData.reduce((sum, student) => sum + student.progress, 0) /
    studentsData.length;
  return (
    <div className="w-full max-w-full space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl ">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-300">
          Students
        </h2>
        <p className="mt-1 text-zinc-700 dark:text-zinc-400">
          Manage student accounts and track their learning progress
        </p>
      </div>
      {/* Stats grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {activeStudents} active students
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 " />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue per Student
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(totalRevenue / totalStudents)}
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Average lifetime value
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(averageProgress)}%
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Average course progress
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-violet-500" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active This Week
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground mb-2">+12% from last week</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500" />
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>
            View and manage student accounts and progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute ml-3 mt-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search students..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Courses Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.country}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{student.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {student.coursesEnrolled} courses
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {student.coursesCompleted} completed
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{student.progress}%</span>
                      </div>
                      <Progress value={student.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${student.totalSpent}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{student.lastLogin}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "active" ? "default" : "secondary"
                      }
                    >
                      {student.status}
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

export default Users;
