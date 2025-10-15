import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

export default function ProtectedRoute({ children }) {
  const navigate =  useNavigate();

  if (!isAuthenticated()) {
    return navigate("/login"); 
  }
  return children;
}