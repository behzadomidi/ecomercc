import { useLocation } from "react-router-dom";
import { hasUserAuthenticated } from "../helpers/api-helper/authentication";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (
    !hasUserAuthenticated &&
    location.pathname !== "/login" &&
    !hasUserAuthenticated &&
    location.pathname !== "/register"
  ) {
    window.location.href = "/login";
  } else if (
    (hasUserAuthenticated && location.pathname === "/login") ||
    (hasUserAuthenticated && location.pathname === "/register")
  ) {
    window.location.href = "/";
  }
  return children;
};
