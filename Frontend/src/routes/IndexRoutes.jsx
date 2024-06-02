import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import React, { createContext, useRef } from "react";
import SideNav from "../components/SideNav";
import VideoCall from "../components/VideoCalling/p2p/VideoCall";
import SnackbarCallInfo from "../components/SnackbarCallInfo";
import AudioCall from "../components/AudioCall/p2p/AudioCall";
import Chat from "../pages/Chat";
import NotFound from "../pages/Error/NotFound";
import Index from "../pages/Index";
export const P2PCallContext = createContext();
const IndexRoutes = () => {
  const videocallRef = useRef();
  const audiocallRef = useRef();
  const requestCall = (callRequestType) => {
    if (callRequestType === "VIDEO_CALL") {
      videocallRef.current.requestVideoToCallUser();
    } else if (callRequestType === "AUDIO_CALL") {
      audiocallRef.current.requesAudioToCallUser();
    }
  };

  return (
    <>
      <VideoCall ref={videocallRef} />
      <AudioCall ref={audiocallRef} />
      <Box sx={{ position: "fixed", left: 0, top: 0 }}>
        <SideNav />
      </Box>
      <P2PCallContext.Provider value={{ requestCall }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/c" element={<Chat />} />
          <Route path="/c/:id" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </P2PCallContext.Provider>
      <SnackbarCallInfo />
    </>
  );
};

export default IndexRoutes;
