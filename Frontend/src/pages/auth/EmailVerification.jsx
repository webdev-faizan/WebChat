import React from "react";
import { useDispatch } from "react-redux";
import { Button, Typography, Box } from "@mui/material";
import { EmailOutlined as EmailIcon } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { verifiedEmail } from "../../redux/silice/auth";
const EmailVerification = () => {
  let [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (!searchParams.get("token")) return;
    dispatch(verifiedEmail(searchParams.get("token")));
  };
  return (
    <Box
      sx={{
        display: "grid",
        placeContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          minWidth: "340px",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <EmailIcon color="primary" fontSize="large" />
        </Box>
        <Typography variant="h5" color="textPrimary" fontWeight="bold" mt={2}>
          Verify Your Email Address
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 16 }}
          onClick={onSubmit}
        >
          Verify Email
        </Button>
      </Box>
    </Box>
  );
};

export default EmailVerification;
