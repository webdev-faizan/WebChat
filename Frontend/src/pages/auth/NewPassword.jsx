import React from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { newPassword } from "../../redux/silice/auth";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";

const fieldIsRequired = "This field is required";
const schemaSignup = yup.object({
  password: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(8, "min length must be at least 8 characters"),
  cpassword: yup
    .string()
    .required(fieldIsRequired)
    .oneOf(
      [yup.ref("password"), null],
      "Passwords and confirm password not match"
    ),
});

const NewPassword = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  let [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: "onTouched",
  });
  const onSubmit = (data) => {
    if (!searchParams.get("token")) return;
    dispatch(newPassword(data, searchParams.get("token")));
    reset();
  };

  return (
    <Container
      maxWidth={isSmallScreen ? "100%" : "xs"}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box mt={5}>
        <Typography variant="h4" align="center">
          New Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
          />
          <TextField
            fullWidth
            label="confirm Password"
            margin="normal"
            name="cpassword"
            {...register("cpassword")}
            error={!!errors.cpassword}
            helperText={errors.cpassword?.message}
            type="password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/login">
              login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default NewPassword;
