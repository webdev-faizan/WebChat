import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Stack } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { Howl } from "howler";
import { useSelector } from "react-redux";
import { socket } from "../socket";

const RingingCall = ({ state, setState, handleAcceptCall, id }) => {
  const {
    callUserInfo: { Username, profileImage },
  } = useSelector((state) => state.app);
  const handleClose = () => {
    setState(false);
  };
  const handleCloseRejectCall = () => {
    const sound = new Howl({
      src: ["/error-warning-login-denied-132113.mp3"],
    });
    sound.play();
    socket.emit("call_denied", { id });
    handleClose();
  };

  const handleCloseAccept = () => {
    handleAcceptCall();
    handleClose();
  };
  const buttons = (
    <Fragment>
      <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
      <Grid container justifyContent="center" columnGap={2}>
        <Grid item xs={5}>
          <Button
            sx={{
              background: "#05df05",
              textTransform: "capitalize",
              width: "70px",
              height: "37px",
              color: "white",

              borderRadius: "10px",
              "&:hover": {
                background: "#05df05",
              },
            }}
            onClick={handleCloseAccept}
          >
            Accept
          </Button>
        </Grid>
        <Grid item xs={5} textAlign="right">
          <Button
            sx={{
              background: "#CC3C3C",
              textTransform: "capitalize",

              width: "70px",
              height: "37px",
              color: "white",
              borderRadius: "10px",
              "&:hover": {
                background: "#CC3C3C",
              },
            }}
            onClick={handleCloseRejectCall}
          >
            Reject
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );

  return (
    <Box>
      <Snackbar
        id="snackbar"
        background="#2196F3"
        sx={{
          background: "#2196F3 !important",
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={state}
        onClose={handleClose}
        message={
          <Stack
            direction={"row"}
            className="flex"
            spacing={3}
            alignItems={"center"}
          >
            <Avatar
              sx={{ width: "30px", height: "30px" }}
              alt={Username}
              src={profileImage}
            />
            <Typography
              sx={{
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "white",
                // color: "#333333",

                marginBottom: "10px",
              }}
            >
              Ringing...
            </Typography>{" "}
            {buttons}
          </Stack>
        }
        key={"vertical horizontal"}
      />
    </Box>
  );
};

export default RingingCall;
