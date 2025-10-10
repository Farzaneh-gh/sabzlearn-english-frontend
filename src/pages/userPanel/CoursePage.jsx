import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/admin/Card/Card";
import { Badge } from "../../components/admin/Badge/Badge";
import { Button } from "../../components/admin/Button/Button";
import { Progress } from "../../components/admin/Progress/Progress";
import { Separator } from "../../components/admin/Separator/Separator";
import { getCourseDetails } from "../../api/courses";
import { getUserOrders } from "../../api/courses";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const CoursePage = () => {
  const { courseName, sessionId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // State management
  const [courseData, setCourseData] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedSessions, setCompletedSessions] = useState([]);

  const [userOrders, setUserOrders] = useState([]);

  // Mark session as completed
  const markSessionCompleted = useCallback(
    (sessionId) => {
      if (!completedSessions.includes(sessionId)) {
        setCompletedSessions((prev) => [...prev, sessionId]);
        // Here you could also make an API call to save progress
      }
    },
    [completedSessions]
  );

  // Check if user can access a specific session
  const canAccessSession = useCallback((session) => {
    if (!session || !courseData) return false;
    
    // Free sessions are always accessible
    if (session.free === 1) return true;
    
    // Check if user has purchased the course
    const hasPurchasedCourse = userOrders.some(
      (order) =>
        order.course._id === courseData._id ||
        order.course.shortName === courseData.shortName
    );
    
    return hasPurchasedCourse;
  }, [courseData, userOrders]);

  // Navigate to different session
  const selectSession = (session) => {
    if (!canAccessSession(session)) {
      setError("You need to purchase this course to access this session.");
      return;
    }
    
    setCurrentSession(session);
    navigate(`/p-user/course/${courseName}/session/${session._id}`);
  };

  // Initialize video player
  useEffect(() => {
    if (videoRef.current && currentSession) {
      const player = new Plyr(videoRef.current, {
        controls: [
          "play-large",
          "play",
          "rewind",
          "fast-forward",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "fullscreen",
        ],
        quality: {
          default: 720,
          options: [1080, 720, 480, 360],
        },
      });

      // Track video completion
      player.on("ended", () => {
        markSessionCompleted(currentSession._id);
      });

      return () => player.destroy();
    }
  }, [currentSession, markSessionCompleted]);

  // Fetch course data and user access
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        setError("Please log in to access course content");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch course details using courseName (shortName)
        const courseDetails = await getCourseDetails(courseName);
        setCourseData(courseDetails);
        setSessions(courseDetails.sessions || []);

        // Fetch user orders to check access
        const orders = await getUserOrders();
        setUserOrders(orders);

        // Check if user has access to this course
        const hasAccessToCourse =
          orders.some(
            (order) =>
              order.course._id === courseDetails._id ||
              order.course.shortName === courseDetails.shortName
          ) || courseDetails.free === 1;

        if (!hasAccessToCourse) {
          setError(
            "You don't have access to this course. Please enroll first."
          );
          setLoading(false);
          return;
        }

        // Set current session
        if (sessionId) {
          const session = courseDetails.sessions?.find(
            (s) => s._id === sessionId
          );
          if (session) {
            // Check if user can access this specific session
            const sessionAccess = session.free === 1 || hasAccessToCourse;
            if (sessionAccess) {
              setCurrentSession(session);
            } else {
              setError("You don't have access to this session. Please purchase the course first.");
              setLoading(false);
              return;
            }
          } else {
            setError("Session not found");
            setLoading(false);
            return;
          }
        } else if (courseDetails.sessions?.length > 0) {
          // Set the first accessible session as current
          const firstAccessibleSession = courseDetails.sessions.find(
            session => session.free === 1 || hasAccessToCourse
          );
          if (firstAccessibleSession) {
            setCurrentSession(firstAccessibleSession);
          } else {
            setError("No accessible sessions found. Please purchase the course to access content.");
            setLoading(false);
            return;
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError(err.message || "Failed to load course data");
        setLoading(false);
      }
    };

    fetchData();
  }, [courseName, sessionId, isLoggedIn]);

  // Calculate progress
  const calculateProgress = () => {
    if (sessions.length === 0) return 0;
    return Math.round((completedSessions.length / sessions.length) * 100);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 mt-10">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <div className="space-y-2">
                <Button onClick={() => navigate("/p-user/courses")} className="w-full">
                  Back to My Courses
                </Button>
                <Button variant="outline" onClick={() => navigate(`/course-info/${courseData?.shortName}`)} className="w-full">
                  View Course Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!courseData || !currentSession) {
    return <div>No course data available</div>;
  }

  return (
     <div className="mt-10 lg:container lg:p-0 lg:space-y-5 ">
      <div className="bg-white dark:bg-transparent  lg:shadow-2xl dark:shadow-none lg:rounded-xl md:p-4">
      {/* Header */}
      <Card>
        <div  className="flex items-center justify-between ">
         
            <div className="flex items-center space-x-4 flex-col sm:flex-row pb-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/p-user/courses")}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Courses
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white ">
                  {courseData.name}
                </h1>
              </div>
            </div>
            
          
         
        </div>
      </Card>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="xl:col-span-3">
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full"
                    poster={
                      currentSession.thumbnail ||
                      `${import.meta.env.VITE_BACKEND_URL_IMG}/courses/covers/${courseData.cover}`
                    }
                    controls
                  >
                    <source
                      src={`${import.meta.env.VITE_BACKEND_URL_IMG}/courses/${currentSession.video}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{currentSession.title}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {currentSession.time || "Duration not specified"}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Session {sessions.findIndex(s => s._id === currentSession._id) + 1} of {sessions.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {completedSessions.includes(currentSession._id) && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Completed
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      onClick={() => markSessionCompleted(currentSession._id)}
                      disabled={completedSessions.includes(currentSession._id)}
                    >
                      Mark Complete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {currentSession.description && (
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{currentSession.description}</p>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sessions Sidebar */}
          <div className="block">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{sessions.length} sessions</span>
                  <span>{completedSessions.length} completed</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {sessions.map((session, index) => {
                    const isCompleted = completedSessions.includes(session._id);
                    const isCurrent = currentSession._id === session._id;
                    const hasAccess = canAccessSession(session);

                    return (
                      <div
                        key={session._id}
                        className={`p-4 border-b border-gray-200 dark:border-gray-700 transition-colors ${
                          hasAccess ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : 'cursor-not-allowed opacity-75'
                        } ${
                          isCurrent
                            ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500"
                            : ""
                        }`}
                        onClick={() => hasAccess && selectSession(session)}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              isCompleted
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : isCurrent
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {isCompleted ? (
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              index + 1
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p
                                className={`text-sm font-medium truncate ${
                                  isCurrent
                                    ? "text-blue-900 dark:text-blue-100"
                                    : hasAccess 
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {session.title}
                              </p>
                              {session.free === 1 && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  Free
                                </Badge>
                              )}
                            </div>
                            {session.time && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {session.time}
                              </p>
                            )}
                          </div>

                          <div className="flex-shrink-0 flex items-center space-x-2">
                            {!hasAccess && (
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            )}
                            {isCurrent && (
                              <div className="flex-shrink-0">
                                <svg
                                  className="w-4 h-4 text-blue-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M8 5v10l7-5z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CoursePage;