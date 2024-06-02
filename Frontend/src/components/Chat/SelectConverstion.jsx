import React from "react";
import { Typography, Stack } from "@mui/material";
const SelectConverstion = () => {
  return (
    <Stack
      flexGrow={1}
      sx={{ width: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack spacing={2}>
        <img
          src={"/conversion.svg"}
          width={287}
          height={287}
          style={{
            objectFit: "cover",
          }}
          alt=""
        />
        <Stack direction={"row"} gap={0.4}>
          <Typography color={"#000"}>
            Select a conversation or start a{" "}
          </Typography>
          <Typography color={"#5B96F7"}>new one</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SelectConverstion;
