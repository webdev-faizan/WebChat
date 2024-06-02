import React from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { RegisterUser } from "../../redux/silice/auth";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
const fieldIsRequired = "This field is required";
const schemaSignup = yup.object({
  fullname: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(3, "First name must be at least 3 charactersr"),
  email: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.com)?$/,
      "Invalid email format"
    ),
  password: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(8, "min length must be at least 8 characters"),
});
const Signup = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { isLoadding } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: "onTouched",
  });
  const onSubmit = (formData) => {
    dispatch(RegisterUser(formData));
  };
  return (
    <Container
      maxWidth={`${isSmallScreen ? "100%" : "xs"}`}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            {...register("fullname")}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            disabled={isLoadding}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
