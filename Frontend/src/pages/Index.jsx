import { useEffect, useLayoutEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = new Cookies();
    if (cookie.get("auth") && cookie.get("auth") != undefined) {
      navigate("/c");
    } else {
      navigate("/login");
    }
  });
};
export default Index;
