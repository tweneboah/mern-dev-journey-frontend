import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentRankList from "./components/Students/StudentsRanking";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import StudentDashboard from "./components/User/StudentDashboard";
import Homepage from "./components/Home/HomePage";
import Courses from "./components/Courses/Courses";
import CourseDetail from "./components/Courses/CourseDetails";
import ProgressUpdate from "./components/Students/ProgressUpdate";
import StartSection from "./components/Students/StartSection";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUserAuthStatus } from "./redux/slices/authSlice";
import AddCourse from "./components/Admin/Courses/AddCourse";
import AddCourseSections from "./components/Admin/CourseSections/AddCourseSection";
import AdminCourses from "./components/Admin/Courses/AdminCourses";
import AdminCourseDetails from "./components/Admin/Courses/AdminCourseDetails";
import UpdateCourse from "./components/Admin/Courses/UpdateCourse";
import AdminCourseSections from "./components/Admin/CourseSections/AdminCourseSections";
import UpdateCourseSection from "./components/Admin/CourseSections/UpdateCourseSection";
import CourseSections from "./components/Admin/Courses/CourseSections";

export default function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUserAuthStatus());
  }, [isAuthenticated]);
  return (
    <BrowserRouter>
      {/* <PublicNavbar />
      <PrivateNavbar /> */}

      {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        {/* Admin links */}
        <Route
          element={
            <AuthRoute>
              <AddCourse />
            </AuthRoute>
          }
          path="/add-course"
        />
        <Route
          element={
            <AuthRoute>
              <AddCourseSections />
            </AuthRoute>
          }
          path="/add-course-sections/:courseId"
        />
        <Route
          element={
            <AuthRoute>
              <AdminCourses />
            </AuthRoute>
          }
          path="/admin-courses"
        />
        {/* admin course details */}
        <Route
          element={
            <AuthRoute>
              <AdminCourseDetails />
            </AuthRoute>
          }
          path="/admin-courses/:courseId"
        />
        {/* admin course details */}
        <Route
          element={
            <AuthRoute>
              <CourseSections />
            </AuthRoute>
          }
          path="/course-sections/:courseId"
        />
        {/* update course */}
        <Route
          element={
            <AuthRoute>
              <UpdateCourse />
            </AuthRoute>
          }
          path="/update-course/:courseId"
        />
        {/* admin course sections */}
        <Route
          element={
            <AuthRoute>
              <AdminCourseSections />
            </AuthRoute>
          }
          path="/admin-course-sections"
        />
        {/* update course section */}
        <Route
          element={
            <AuthRoute>
              <UpdateCourseSection />
            </AuthRoute>
          }
          path="/update-course-section/:sectionId"
        />

        <Route element={<Homepage />} path="/" />
        <Route
          element={<StudentRankList />}
          path="/students-position/:courseId"
        />
        <Route element={<Courses />} path="/courses" />
        <Route element={<CourseDetail />} path="/courses/:courseId" />
        <Route
          element={
            <AuthRoute>
              <StartSection />
            </AuthRoute>
          }
          path="/start-section/:courseId"
        />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route
          element={
            <AuthRoute>
              <StudentDashboard />
            </AuthRoute>
          }
          path="/student-dashboard"
        />

        <Route
          element={
            <AuthRoute>
              <ProgressUpdate />
            </AuthRoute>
          }
          path="/progress-update/:courseId"
        />
        {/* register */}
      </Routes>
    </BrowserRouter>
  );
}
