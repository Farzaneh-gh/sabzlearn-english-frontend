import Index from "./pages/index/Index";
import CourseInfo from "./pages/courseInfo/CourseInfo";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Courses from "./pages/courses/Courses";
import ArticleInfo from "./pages/articleInfo/ArticleInfo";
import Articles from "./pages/allArticles/Articles";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "course-info/:courseName", element: <CourseInfo /> },
      { path: "courses/:pageNumber", element: <Courses /> },
      { path: "article-info/:articleId", element: <ArticleInfo /> },
      { path: "articles/:pageNumber", element: <Articles /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];



export default routes;