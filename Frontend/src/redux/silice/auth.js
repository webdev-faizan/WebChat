import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import axiosInstance from "../../service/axiosInstance";
const cookie = new Cookies();
const initialState = {
  isLoading: false,
  error: false,
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateRegisterEmail(state, actions) {
      state.isLoading = actions.payload.isLoading;
      state.error = actions.payload.error;
    },
    loginUser(state, actions) {
      state.isLoading = actions.payload.isLoading;
      state.error = actions.payload.error;
    },
    updateLoadingState(state, action) {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
  },
});

export default slice.reducer;

export function RegisterUser(FormData) {
  return async (disptach, state) => {
    disptach(
      slice.actions.updateRegisterEmail({ isLoading: true, error: false })
    );
    await axiosInstance
      .post("/auth/register", { ...FormData })
      .then(({ data }) => {
        toast.success(data?.message, {
          autoClose: 1000,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      })
      .catch((error) => {
        toast.error(error?.response?.data.message);
        disptach(
          slice.actions.updateRegisterEmail({
            error: true,
          })
        );
      })
      .finally(() => {
        slice.actions.updateRegisterEmail({
          isLoading: false,
        });
      });
  };
}

export function LoginUser(FormData) {
  return async (disptach) => {
    disptach(
      slice.actions.loginUser({
        isLoading: true,
      })
    );
    await axiosInstance
      .post("/auth/login", { ...FormData })
      .then(({ data }) => {
        toast.success(data?.message, {
          autoClose: 1000,
        });
        const expirationTime = new Date(Date.now() + 30 + 24 * 60 * 60 * 1000);
        cookie.set("auth", data?.token, {
          path: "/",
          expires: expirationTime,
        });

        cookie.set("user_id", data?.id, {
          path: "/",
          expires: expirationTime,
        });
        setTimeout(() => {
          window.location.href = "/c";
        }, 1500);
      })
      .catch((error) => {
        toast.error(error && error?.response?.data?.message, {
          autoClose: 3000,
        });
      })
      .finally(() => {
        disptach(
          slice.actions.loginUser({
            isLoading: false,
          })
        );
      });
  };
}
export function verifiedEmail(authToken) {
  return async (disptach) => {
    disptach(
      slice.actions.updateLoadingState({
        isLoading: true,
      })
    );
    const Token = authToken;
    await axiosInstance
      .post("/auth/email-verification", { token: Token })
      .then(({ data }) => {
        toast.success(data?.message, {
          autoClose: 1000,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((error) => {
        toast.error(error && error?.response?.data?.message, {
          autoClose: 3000,
        });
      })
      .finally(() => {
        disptach(
          slice.actions.loginUser({
            isLoading: false,
          })
        );
      });
  };
}

export function forgetPassword(FormData) {
  return async (disptach) => {
    disptach(
      slice.actions.updateLoadingState({
        isLoading: true,
      })
    );
    await axiosInstance
      .post("/auth/forgot-password", { ...FormData })
      .then(({ data }) => {
        toast.success(data?.message, {
          autoClose: 1000,
        });
      })
      .catch((error) => {
        toast.error(error && error?.response?.data?.message, {
          autoClose: 3000,
        });
      })
      .finally(() => {
        disptach(
          slice.actions.loginUser({
            isLoading: false,
          })
        );
      });
  };
}
export function newPassword(FormData, token) {
  return async (disptach) => {
    disptach(
      slice.actions.updateLoadingState({
        isLoading: true,
      })
    );
    await axiosInstance
      .post("/auth/new-password", { ...FormData, token })
      .then(({ data }) => {
        toast.success(data?.message, {
          autoClose: 1000,
        });
      })
      .catch((error) => {
        toast.error(error && error?.response?.data?.message, {
          autoClose: 3000,
        });
      })
      .finally(() => {
        disptach(
          slice.actions.loginUser({
            isLoading: false,
          })
        );
      });
  };
}
