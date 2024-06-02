import { useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import React, { useEffect, useRef } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import ChatDashboard from "../components/Chat/ChatDashboard";
import Conversion from "../components/Chat/Conversion";
import Message from "../components/Chat/message";
import { connectSocket, socket } from "../socket";
import {
  SelectConversation,
  showSnackBar,
  CallNotifcation,
  ShowVideo,
  ShowAudio,
} from "../redux/app";
import { Howl } from "howler";
import {
  FetchDirectConversion,
  UpdateCurrentMessage,
} from "../redux/silice/conversions";
import { incomingCall } from "../redux/silice/videocall";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();
  const disptach = useDispatch();
  const container = useRef();
  const isMediumScreen = useMediaQuery("(max-width:1050px)");
  const isLargeScreen = useMediaQuery("(min-width:1550px)");
  const soundAngery = new Howl({
    src: ["/ error-warning-login-denied-132113.mp3"],
  });
  useEffect(() => {
    if (token && token != undefined && token != null) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#load";
          window.location.reload();
        }
      };
      window.onload();
    }
    if (!socket) {
      connectSocket();
    }
    socket?.on("friend_request_sent", (data) => {
      const sound = new Howl({
        src: ["/mixkit-bubble-pop-up-alert-notification-2357.wav"],
      });
      sound.play();
      disptach(showSnackBar({ open: true, message: data?.message }));
    });
    socket?.on("new_friend_request", (data) => {
      const sound = new Howl({
        src: ["/mixkit-happy-bells-notification-937.wav"],
      });
      sound.play();
    });

    socket?.on("friend_request_accepted", (data) => {
      const sound = new Howl({
        src: ["/mixkit-bubble-pop-up-alert-notification-2357.wav"],
      });
      sound.play();
      disptach(showSnackBar({ open: true, message: data?.message }));
    });

    socket?.on("start_chat", (data) => {
      disptach(SelectConversation(data._id));
    });
    socket?.emit("get_direct_conversions", { token }, (data, userId) => {
      disptach(FetchDirectConversion(data, userId));
    });

    socket?.on("new_message", (data) => {
      if (token != data?.token) {
        const sound = new Howl({
          src: ["/mixkit-happy-bells-notification-937.wav"],
        });
        sound.play();
      }
      disptach(UpdateCurrentMessage(data));
      setTimeout(() => {
        const ele = container.current;
        if (ele) {
          ele.scrollTo(0, ele.scrollHeight);
        }
      }, 200);
      socket?.emit("get_direct_conversions", { token }, (data, userId) => {
        disptach(FetchDirectConversion(data, userId));
      });
    });
    //! user notifcation about call
    socket.on("busy_another_call", ({ message }) => {
      soundAngery.play();
      disptach(CallNotifcation({ ShowCallNotifcation: true, message }));
    });

    socket.on("user_offline", ({ message }) => {
      disptach(ShowVideo(false));
      disptach(ShowAudio(false));
      disptach(incomingCall(false));
      soundAngery.play();
      disptach(CallNotifcation({ ShowCallNotifcation: true, message }));
    });
    socket.on("call_denied", ({ message }) => {
      disptach(ShowVideo(false));
      disptach(ShowAudio(false));
      disptach(incomingCall(false));
      soundAngery.play();
      disptach(CallNotifcation({ ShowCallNotifcation: true, message }));
    });
    socket.on("connect_error", (err) => {
      if (err.message === "InterNal Server Error") {
        cookie.remove("auth");
        cookie.remove("id");
        navigate("/login");
        navigate("/");
        window.location.reload();
      }

      if (err.message === "not authorized") {
        cookie.remove("auth");
        cookie.remove("id");
        navigate("/");
        window.location.reload();
      }
    });

    return () => {
      socket?.off("friend_request_accepted");
      socket?.off("start_chat");
      socket?.off("new_friend_request");
      socket?.off("friend_request_sent");
      socket?.off("get_direct_conversions");
      socket?.off("new_message");
      socket?.off("call_denied");
      socket?.off("user_offline");
      socket?.off("busy_another_call");
      socket?.off("connect_error");
    };
  }, [socket]);
  useEffect(() => {
    setTimeout(() => {
      const ele = container.current;
      if (ele) {
        ele.scrollTo(0, ele.scrollHeight);
      }
    }, 200);
  }, [sessionStorage.getItem("scroll")]);
  return (
    <>
      <Stack
        sx={{
          position: isLargeScreen | isMediumScreen ? "absolute" : "fixed",
          left: "100px",
          direction: "row",
        }}
      >
        <ChatDashboard />
      </Stack>
      <Stack alignItems={"center"}>
        <Stack
          sx={{
            ...(isLargeScreen && {
              minWidth: "850px",
              maxWidth: "850px",
              marginLeft: "460px",
              position: "relative",
            }),
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              marginLeft: isLargeScreen ? "unset" : "459px",
              marginTop: "90px",
            }}
          >
            <Conversion />
            <Box
              ref={container}
              sx={{
                height: "calc(100vh - 145px)",
                overflowX: "auto",
                width:
                  isLargeScreen | isMediumScreen
                    ? " calc(100% + 9px)"
                    : "unset",
              }}
            >
              <Message />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Chat;
