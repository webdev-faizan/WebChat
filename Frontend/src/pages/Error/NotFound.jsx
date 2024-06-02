import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";
const NotFound = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Go to Home Page
      </Button>
    </Container>
  );
};

export default NotFound;
