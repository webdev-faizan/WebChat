import { Route, Routes } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import NewPassword from "../pages/auth/NewPassword";
import EmailVerification from "../pages/auth/EmailVerification";
import NotFound from "../pages/Error/NotFound";
import Index from "../pages/Index";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
