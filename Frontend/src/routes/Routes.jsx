import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import AuthRoutes from "./AuthRoutes";
import IndexRoutes from "./IndexRoutes";

const Routes = () => {
  const cookie = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(cookie.get("auth") && cookie.get("auth") !== " undefined")
  );
  const location = useLocation();
  useEffect(() => {
    if (!cookie.get("auth")) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [location.pathname, cookie.get("auth")]);

  return <>{isAuthenticated ? <IndexRoutes /> : <AuthRoutes />}</>;
};
export default Routes;
