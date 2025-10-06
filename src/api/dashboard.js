// Mock API functions - replace with your actual API calls
export const getDashboardStats = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    totalRevenue: 73245,
    activeStudents: 3487,
    courseCompletion: 87.2,
    averageRating: 4.8,
    revenueGrowth: 23.5,
    newStudents: 180,
    completionGrowth: 5.2,
    ratingGrowth: 0.3,
  };
};

export const getRecentUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      joinDate: "2024-01-15",
      status: "active",
      coursesEnrolled: 3,
      lastActive: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      joinDate: "2024-01-14",
      status: "active",
      coursesEnrolled: 2,
      lastActive: "1 day ago",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
    },
  ];
};

export const getTopCourses = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return [
    {
      id: 1,
      title: "Complete React Development Course",
      instructor: "Sarah Chen",
      students: 1247,
      rating: 4.8,
      revenue: 12450,
      completion: 87,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=40&h=40&fit=crop",
    },
    {
      id: 2,
      title: "Advanced JavaScript Masterclass",
      instructor: "Mike Johnson",
      students: 856,
      rating: 4.9,
      revenue: 8560,
      completion: 92,
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=40&h=40&fit=crop",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Emily Davis",
      students: 734,
      rating: 4.7,
      revenue: 7340,
      completion: 78,
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=40&h=40&fit=crop",
    },
  ];
};

export const getEnrollmentData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [
    { month: "Jan", enrollments: 320, revenue: 4200 },
    { month: "Feb", enrollments: 280, revenue: 3800 },
    { month: "Mar", enrollments: 420, revenue: 5200 },
    { month: "Apr", enrollments: 580, revenue: 6100 },
    { month: "May", enrollments: 640, revenue: 7300 },
    { month: "Jun", enrollments: 720, revenue: 8500 },
  ];
};

export const getCourseCompletionData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return [
    { course: "React", completion: 85 },
    { course: "Node.js", completion: 92 },
    { course: "Python", completion: 78 },
    { course: "JavaScript", completion: 89 },
  ];
};
