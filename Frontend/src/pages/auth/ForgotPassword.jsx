import React from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { forgetPassword } from "../../redux/silice/auth";
const fieldIsRequired = "This field is required";
const schemaSignup = yup.object({
  email: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.com)?$/,
      "Invalid email format"
    ),
});
const ForgotPassword = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: "onTouched",
  });
  const onSubmit = (formData) => {
    dispatch(forgetPassword(formData));
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
        <Typography variant="h4" align="center">
          Forget Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Forget Password
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Click to ?
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
