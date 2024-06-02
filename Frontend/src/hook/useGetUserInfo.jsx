import { useState, useEffect } from "react";
import axiosInstance from "../service/axiosInstance";
import { useDispatch } from "react-redux";
import { AddUserInfo } from "../redux/app";
const useFetchedUserInfo = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axiosInstance.get("/user/get-profile");
        dispatch(AddUserInfo(data));
        setUserInfo(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, isLoading, error };
};

export default useFetchedUserInfo;
