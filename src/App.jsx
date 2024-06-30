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
import InstructorNavbar from "./components/Navbar/InstructorNavbar";
import InstructorRoutes from "./components/AuthRoute/InstructorRoutes";
import CourseChallengeAnnouncement from "./components/Rewards/CourseChallengeAnnouncement";

export default function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, userProfile } = useSelector((state) => state.auth);
  const isInstructor = userProfile?.role === "instructor";
  const isStudent = userProfile?.role === "student";
  useEffect(() => {
    dispatch(checkUserAuthStatus());
  }, [isAuthenticated, isInstructor, isStudent]);
  // Determine which navbar to render
  let NavbarComponent;
  if (isAuthenticated) {
    switch (userProfile?.role) {
      case "instructor":
        NavbarComponent = InstructorNavbar;
        break;
      case "student":
        NavbarComponent = PrivateNavbar;
        break;
      default:
        NavbarComponent = PublicNavbar;
    }
  } else {
    NavbarComponent = PublicNavbar;
  }
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        {/* instructor links */}
        <Route
          element={
            <InstructorRoutes>
              <AddCourse />
            </InstructorRoutes>
          }
          path="/instructor-add-course"
        />
        <Route
          element={
            <InstructorRoutes>
              <AdminCourses />
            </InstructorRoutes>
          }
          path="/instructor-courses"
        />
        {/* admin course details */}
        <Route
          element={
            <InstructorRoutes>
              <AdminCourseDetails />
            </InstructorRoutes>
          }
          path="/instructor-courses/:courseId"
        />
        {/* update course */}
        <Route
          element={
            <InstructorRoutes>
              <UpdateCourse />
            </InstructorRoutes>
          }
          path="/instructor-update-course/:courseId"
        />
        <Route
          element={
            <instructor-course-sections>
              <AddCourseSections />
            </instructor-course-sections>
          }
          path="/instructor-add-course-sections/:courseId"
        />

        {/* admin course details */}
        <Route
          element={
            <instructor-course-sections>
              <CourseSections />
            </instructor-course-sections>
          }
          path="/instructor-course-sections/:courseId"
        />

        {/* admin course sections */}
        <Route
          element={
            <AuthRoute>
              <AdminCourseSections />
            </AuthRoute>
          }
          path="/instructor-course-sections"
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
        <Route
          element={<CourseChallengeAnnouncement />}
          path="/reward-challenge"
        />
        {/* register */}
      </Routes>
    </BrowserRouter>
  );
}
