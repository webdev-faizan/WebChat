import React, { useState } from "react";
import {
  Box,
  Stack,
  Divider,
  Typography,
  Link,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { Image, DotsThreeVertical, DownloadSimple } from "phosphor-react";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import { message_options } from "../../data/index";
const cookie = new Cookies().get("user_id");
const download = (e) => {
  const parsedUrl = new URL(e);
  const pathname = parsedUrl.pathname;
  const fileExtension = pathname.substring(pathname.lastIndexOf("."));
  fetch(e, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", Date.now() + fileExtension);
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch((error) => {
      toast.error(error?.response?.message, {
        autoClose: 1200,
      });
    });
};
const DocMsg = ({ ele }) => {
  const [, , time] = ele.created_at.split("+");
  return (
    <Stack
      direction={"row"}
      justifyContent={ele.to === cookie ? "start" : "end"}
    >
      <Box
        sx={{
          borderRadius: "10px",
          background: ele.to === cookie ? "#d3d3d3fa" : "#5B96F7",
          width: "max-content",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Image size={48} color="gray" />
            <Typography
              variant="caption"
              color={ele.to === cookie ? "#696969" : "#FFF"}
            >
              {ele.message}
            </Typography>
            <IconButton onClick={() => download(ele.link)}>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography color={ele.to === cookie ? "#696969" : "#FFF"}>
            {time}
          </Typography>
        </Stack>
      </Box>
      {/* <MessageOption /> */}
    </Stack>
  );
};
const LinkMsg = ({ ele }) => {
  const time = ele.created_at.split("+").at(-1);

  return (
    <Stack
      direction={"row"}
      justifyContent={ele.to === cookie ? "start" : "end"}
    >
      <Box
        sx={{
          borderRadius: "10px",
          background: ele.to === cookie ? "#5B96F7" : "#d3d3d3fa",
          width: "max-content",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            component={Link}
            href={ele.link}
            target="_faizan"
          >
            {ele.link}
          </Typography>

          <Typography
            variant="subtitle2"
            color={ele.to === cookie ? "#696969" : "#FFF"}
          >
            {ele.message}
          </Typography>
          <Typography variant="caption" color={"white"}>
            {time}
          </Typography>
        </Stack>
      </Box>
      {/* <MessageOption /> */}
    </Stack>
  );
};

const ReplyMsg = ({ ele }) => {
  return (
    <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
      <Box
        sx={{
          borderRadius: "10px",
          background: ele.incoming ? "#d3d3d3fa" : "#5B96F7",
          width: "max-content",
          padding: "10px",
        }}
      >
        <Stack spacing={0.5}>
          <Stack direction={"column"} background={"#FFF"} borderRadius={1}>
            <Typography
              sx={{
                background: "white",
                paddingX: "10px",
                borderRadius: "4px",
              }}
            >
              {ele.reply}
            </Typography>
          </Stack>
          <Typography color={"white"}> {ele.message}</Typography>
        </Stack>
      </Box>
      {/* <MessageOption /> */}
    </Stack>
  );
};
const MediaMsg = ({ ele }) => {
  const [, , time] = ele.created_at.split("+");
  return (
    <Stack
      direction={"row"}
      justifyContent={ele.to === cookie ? "start" : "end"}
    >
      <Box
        sx={{
          borderRadius: "10px",
          width: "max-content",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{
              borderRadius: "10px",
              width: "max-content",
              padding: "10px",
            }}
          >
            <img
              src={ele.link}
              alt="as"
              style={{
                width: "201px",
                height: "183px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <Typography
              variant="caption"
              color={ele.to === cookie ? "#696969" : "#FFF"}
            >
              {ele.message}
            </Typography>
            <IconButton onClick={() => download(ele.link)}>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography color={ele.to === cookie ? "#696969" : "#FFF"}>
            {time}
          </Typography>
        </Stack>
      </Box>
      {/* <MessageOption /> */}
    </Stack>
  );
};

const TimeLine = ({ ele }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems="center"
    >
      <Divider width="46%" />
      <Typography variant="caption">{ele.text}</Typography>
      <Divider width="46%" />
    </Stack>
  );
};

const TextMsg = ({ ele }) => {
  const time = ele.created_at.split("+").at(-1);

  return (
    <Stack
      direction={"row"}
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      justifyContent={ele.to === cookie ? "start" : "end"}
    >
      <Box
        sx={{
          background: ele.to === cookie ? "#5B96F7" : "#d3d3d3fa",
          overflowWrap: "break-word",
          wordWrap: "break-word",
          borderRadius: "10px",
          padding: "10px",
          paddingX: "30px",
        }}
      >
        <Typography
          color={ele.to === cookie ? "white" : "black"}
          sx={{
            overflowWrap: "break-word",
            wordWrap: "break-word",
          }}
        >
          {ele.message}
        </Typography>
        <Typography
          color={ele.to === cookie ? "white" : "black"}
          sx={{
            fontSize: "10px",
          }}
        >
          {time}
        </Typography>
      </Box>
      {/* <MessageOption /> */}
    </Stack>
  );
};
const MessageOption = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeVertical
        size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack>
          {message_options.map((ele) => {
            return <MenuItem onClick={handleClose}>{ele.title}</MenuItem>;
          })}
        </Stack>
      </Menu>
    </>
  );
};
export { TextMsg, TimeLine, MediaMsg, ReplyMsg, LinkMsg, DocMsg };
