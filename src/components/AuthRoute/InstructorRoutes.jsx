import { Navigate, useLocation } from "react-router-dom";
import AuthCheckingComponent from "../Alert/AuthCheckingComponent";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { checkUserAuthStatusAPI } from "../../reactQuery/user/usersAPI";

import { useEffect } from "react";
import { checkUserAuthStatus } from "../../redux/slices/authSlice";

const InstructorRoutes = ({ children }) => {
  const dispatch = useDispatch();

  const { isAuthenticated, userProfile } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUserAuthStatus());
  }, [isAuthenticated]);
  //use location
  const location = useLocation();
  //dispatch

  //react query
  const { data, isLoading } = useQuery({
    queryKey: ["userAuth"],
    queryFn: checkUserAuthStatusAPI,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <AuthCheckingComponent />;
  }

  if (userProfile?.role !== "instructor") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default InstructorRoutes;
