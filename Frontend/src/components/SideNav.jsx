import React, { useState } from "react";
import { Box, Stack, IconButton, Divider, Avatar } from "@mui/material";
import { SignOut } from "phosphor-react";
import { Cookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { NavButton } from "../data/index";
import { useDispatch, useSelector } from "react-redux";
import {
  NewConversion,
  RemoveCurrentMessages,
} from "../redux/silice/conversions.js";
import { uploadUserAssest } from "../service/uploadUserAssest.js";
import { updateUserProfile } from "../service/user.js";
import { UpdateUserInfo } from "../redux/app.js";
import useFetchedUserInfo from "../hook/useGetUserInfo.jsx";
function SideNav() {
  const [select, SetSlect] = useState(0);
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const {
    userInfo: { fullname = "NAN", avatar = "" },
  } = useSelector((state) => state.app);
  useFetchedUserInfo();
  const handeChange = async (e) => {
    try {
      const { url } = await uploadUserAssest(e.traget.files[0]);
      dispatch(UpdateUserInfo(url));
      await updateUserProfile(url);
    } catch (error) {
      toast.error("Image Upload Failed Please Try again later.");
    }
  };
  return (
    <Box>
      <Box
        sx={{
          width: "100px",
          background: "#FFFFFF",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          height: "100vh",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 0",
        }}
      >
        <Stack spacing={1} direction="column" alignItems="center">
          <Box
            sx={{
              width: "64px",
              height: "64px",
              borderRadius: "12px",
              background: "#AFBBF7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={"/logo.webp"}
              alt=""
              style={{
                height: "47px",
                width: "47px",
                borderRadius:"100%"
              }}
            />
          </Box>
          <br />
          <br />
          <Stack spacing={1} direction="column" alignItems="center">
            {NavButton.map((icons) => {
              const { icon, index, to } = icons;
              return (
                <Box
                  onClick={() => {
                    dispatch(NewConversion(true));
                    dispatch(RemoveCurrentMessages());
                  }}
                  sx={{
                    background: select === index ? "#5B96F7" : "#F0F4FA",
                    borderRadius: "12px",
                  }}
                >
                  <NavLink to={to}>
                    <IconButton
                      onClick={() => {
                        SetSlect(index);
                        dispatch(NewConversion(true));
                        dispatch(RemoveCurrentMessages());
                      }}
                      sx={{
                        color: select === index ? "#FFFFFF" : "#080707",
                        fontSize: "24px",
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      {icon}
                    </IconButton>
                  </NavLink>
                </Box>
              );
            })}
          </Stack>
          <br />
          <Divider
            orientation="horizontal"
            sx={{
              background: "#B4B4B4",
              marginY: "40px",
              width: "100%",
              height: "1px",
            }}
          />
        </Stack>

        <Stack
          sx={{
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <NavLink to="setting">
            <IconButton
              sx={{
                fontSize: "24px",
                color: "#080707",
                width: "48px",
                height: "48px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></IconButton>
          </NavLink>
          <Stack
            spacing={1}
            sx={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                position: "absolute",
                top: 0,
                zIndex: 3,
              }}
            >
              <input
                type="file"
                style={{
                  width: "39px",
                  height: "50px",
                  opacity: "0",
                }}
                accept="Image/*"
                onChange={handeChange}
              />
            </Stack>
            <Avatar alt={fullname} src={avatar} />
            <IconButton
              onClick={() => {
                cookie.remove("auth");
                cookie.remove("user_id");
                window.location.reload();
                window.location.href = "/login";
              }}
            >
              <SignOut size={32} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default SideNav;
