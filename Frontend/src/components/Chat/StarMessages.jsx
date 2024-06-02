import { Grid, IconButton, Link, Stack } from "@mui/material";
import { Box, borderRadius } from "@mui/system";
import { ArrowLeft } from "phosphor-react";
import React, { useState } from "react";
import { starMessages } from "../../data/starMessage";
import {
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
} from "../../components/Chat/MsgTypes";

import { updateSidebarTap } from "../../redux/app";
import { useDispatch } from "react-redux";

export const StartMessages = () => {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2}>
      <Box
        height={80}
        sx={{
          marginLeft: "4px",
          width: "308px",
          marginTop: "-4px",
          boxShadow: " 0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          background: "#F8FAFF",
          display: "flex",
          alignItems: "center",
          paddingLeft: "30px",
        }}
      >
        <IconButton
          style={{
            cursor: "pointer",
          }}
          onClick={() => dispatch(updateSidebarTap("CONTACT"))}
        >
          <ArrowLeft size={24} />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        {starMessages.map((ele) => {
          switch (ele.type) {
            case "msg":
              switch (ele.subtype) {
                case "link":
                  return <LinkMsg ele={ele} />;
                case "img":
                  return <MediaMsg ele={ele} />;

                case "doc":
                  return <DocMsg ele={ele} />;

                case "reply":
                  return <ReplyMsg ele={ele} />;

                default:
                  return <TextMsg ele={ele} />;
              }
            default:
          }
        })}
      </Stack>
    </Stack>
  );
};

export default StartMessages;
