import React, { useContext, useState } from "react";
import { StyledBadge } from "../StyledBadge";
import data from "@emoji-mart/data";
import { useSelector } from "react-redux";
import Picker from "@emoji-mart/react";
import { Howl } from "howler";
import Box from "@mui/joy/Box";

import {
  Stack,
  IconButton,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  useMediaQuery,
} from "@mui/material";

import {
  LinkSimple,
  Phone,
  VideoCamera,
  Smiley,
  File,
  Image,
  PaperPlaneTilt,
  XCircle,
} from "phosphor-react";
import { socket, token } from "../../socket";
import SelectConverstion from "./SelectConverstion.jsx";
import { P2PCallContext } from "../../routes/IndexRoutes";
import { uploadUserAssest } from "../../service/uploadUserAssest.js";
import { toast } from "react-toastify";
const Conversion = () => {
  const { requestCall } = useContext(P2PCallContext);
  const isSmallScreen = useMediaQuery("(max-width:1050px)");
  const [PreviewImage, setPreviewImage] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const [loadding, setIsloading] = useState(false);
  const { userInfo, newConversion } = useSelector((state) => state.conversions);
  const [showPicker, setShowPicker] = useState(false);
  const [ShowAttachement, setShowAttachement] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [Assest, setAssest] = useState(null);
  const EmojiSelect = ({ native }) => {
    setInputValue(inputValue + native);
  };
  const { sentMessageInfo } = useSelector((state) => state.app);
  const isLargeScreen = useMediaQuery("(min-width:1550px)");

  const sendMsg = async () => {
    try {
      setIsloading(true);

      if (Assest) {
        const { url, fileName } = await uploadUserAssest(Assest);
        if (Assest.type.startsWith("image")) {
          socket.emit("link_message", {
            token,
            from: sentMessageInfo.from,
            conversation_id: sentMessageInfo.roomId,
            type: "msg",
            subType: "Media",
            fileName,
            link: url,
            mimeType: "",
            message: inputValue || "",
          });
          setPreviewImage(null);
          setPreviewType(null);
          setAssest(null);
          return;
        } else {
          socket.emit("link_message", {
            token,
            from: sentMessageInfo.from,
            conversation_id: sentMessageInfo.roomId,
            type: "msg",
            fileName: fileName,
            mimeType: "",
            subType: "Document",
            link: url,
            message: inputValue | "",
          });
          setPreviewImage(null);
          setPreviewType(null);
          setAssest(null);
          return;
        }
      }

      if (!inputValue) return;
      // ! for text Link
      //check is link or not
      else if (
        inputValue.startsWith("http://") ||
        inputValue.startsWith("https://")
      ) {
        //sperate text or link
        const linkPattern = /\b(?:https?|ftp):\/\/\S+\b/g;
        const links = inputValue.match(inputValue) || [];
        const textWithoutLinks = inputValue.replace(linkPattern, "");
        //send link_message
        socket.emit("link_message", {
          token,
          from: sentMessageInfo.from,
          conversation_id: sentMessageInfo.roomId,
          type: "msg",
          subType: "Link",
          link: links[0],
          message: textWithoutLinks,
        });
      } else {
        // ! for tet message
        if (inputValue.length > 0) {
          socket?.emit("text_message", {
            token,
            from: sentMessageInfo.from,
            conversation_id: sentMessageInfo.roomId,
            type: "Text",
            message: inputValue,
          });
        }
      }
    } catch (error) {
      toast.error("Unabel to send message", {
        autoClose: 1200,
      });
    } finally {
      setInputValue("");
      setIsloading(false);
    }
  };
  const { incoming } = useSelector((state) => state.video);

  return (
    <>
      <Stack
        display={`${newConversion ? "flex" : "none"}`}
        direction={"row"}
        sx={{
          justifyItems: "center",
          top: "-90px",
          overflow: "hidden",
          height: "100vh",
          position: "relative",
        }}
        alignItems={"center"}
      >
        <SelectConverstion />
      </Stack>
      <Stack
        display={`${newConversion ? "none" : "block"}`}
        direction={"column"}
        sx={{
          width: isLargeScreen ? "850px" : "calc(100vw - 452px)",
        }}
        justifyContent={"space-between"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            width: isSmallScreen ? "600px" : "inherit",
            position: isSmallScreen ? "absolute" : "fixed",
            top: 0,
            height: "80px",
            padding: "5px 20px 0",
            marginBottom: "30px",
            background: "#F8FAFF",
            "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box
            sx={{
              height: "81px",
              "flex-shrink": 0,
              "border-radius": "15px",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            {userInfo?.online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{
                  opacity: `${userInfo?.online ? "100" : "0"}`,
                }}
              >
                <Avatar
                  sx={{ width: "48px", height: "48px" }}
                  src={userInfo?.avatar}
                  alt={userInfo?.name}
                />
              </StyledBadge>
            ) : (
              <Avatar
                sx={{ width: "48px", height: "48px" }}
                src={userInfo?.avatar}
                alt={userInfo?.name}
              />
            )}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                padding: "0 15px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#000",
                    fontFamily: "Manrope",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "800",
                    background: "unset",
                    marginBottom: "3px",
                  }}
                >
                  {userInfo?.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#696969",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "normal",
                    background: "unset",
                  }}
                >
                  {userInfo?.online && "online"}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* converions */}
          <Stack direction={"row"}>
            <IconButton
              disabled={incoming}
              onClick={() => requestCall("VIDEO_CALL")}
            >
              <VideoCamera />
            </IconButton>
            <IconButton
              disabled={incoming}
              onClick={() => requestCall("AUDIO_CALL")}
            >
              <Phone />
            </IconButton>
          </Stack>
        </Stack>
        {/* user footer */}
        <Stack
          className="row"
          spacing={3}
          direction={"row"}
          paddingRight={"10px"}
          alignItems={"center"}
          sx={{
            width: isSmallScreen ? "600px" : "inherit",
            position: isSmallScreen ? "absolute" : "fixed",
            bottom: "3px",
          }}
        >
          <Box
            display={"flex"}
            gap={3}
            alignItems="center"
            sx={{ width: "inherit", paddingX: "1px", position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                right: "99px",
                bottom: "70px",
                display: `${showPicker ? "block" : "none"}`,
              }}
            >
              <Picker
                data={data}
                emojiSize={20}
                onEmojiSelect={EmojiSelect}
                dynamicWidth={false}
                className="picker"
              />
            </Box>
            {/*  */}
            <Stack
              spacing={1}
              sx={{
                position: "absolute",
                left: "42px",
                bottom: "72px",
                zIndex: 200,

                display: `${ShowAttachement ? "flex" : "none"}`,
              }}
            >
              <IconButton
                sx={{
                  background: "#007bff",
                  ":hover": {
                    background: "#007bff",
                  },
                }}
              >
                <input
                  style={{
                    position: "absolute",
                    width: "36px",
                    height: "40px",
                    top: "10px",
                    opacity: "0",
                  }}
                  type="file"
                  accept="application/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const maxSizeInBytes = 100 * 1024;
                    if (file && file.size > maxSizeInBytes) {
                      toast.error("File size exceeds the limit of 100 KB.", {
                        autoClose: 2000,
                      });
                      e.target.value = null;
                      return;
                    }
                    setAssest(file);
                    setShowAttachement(false);
                    setPreviewType("Document");
                  }}
                />
                <File size={24} />
              </IconButton>
              <IconButton
                sx={{
                  position: "relative",
                  background: "#28a745",
                  ":hover": {
                    background: "#28a745",
                  },
                }}
              >
                <input
                  style={{
                    position: "absolute",
                    width: "36px",
                    height: "40px",
                    top: "10px",
                    opacity: "0",
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const maxSizeInBytes = 30 * 1024;
                    if (file && file.size > maxSizeInBytes) {
                      toast.error("File size exceeds the limit of 30 KB.", {
                        autoClose: 2000,
                      });
                      e.target.value = null;
                      return;
                    }
                    setAssest(file);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setPreviewImage(reader.result);
                      setPreviewType("Image");
                      setShowAttachement(false);
                    };
                    reader?.readAsDataURL(file);
                  }}
                />
                <Image size={24} />
              </IconButton>
            </Stack>
            <Stack
              sx={{
                background: "#F7F9FD",
                height: "80px",
                alignItems: "center",

                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
              width={"inherit"}
              direction={"row"}
              paddingX={4}
              position={"relative"}
              bottom="-10px"
              zIndex={100}
            >
              <form
                style={{ width: "100%" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMsg();
                }}
              >
                {previewType && (
                  <Box
                    sx={{
                      position: "absolute",
                      background: "#5B96F7",
                      width: "210px",
                      height: "160px",
                      top: "0",
                      marginTop: "-150px",
                      padding: "6px",
                      zIndex: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      sx={{ position: "absolute", right: "7px", top: "7px" }}
                    >
                      <XCircle
                        size={22}
                        cursor={"pointer"}
                        onClick={() => {
                          setPreviewType(null);
                          setAssest(null);
                        }}
                      />
                    </Box>
                    {previewType === "Document" ? (
                      <img
                        src={"/pdf.webp"}
                        alt=""
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      <img
                        src={PreviewImage}
                        alt=""
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                        }}
                      />
                    )}
                  </Box>
                )}

                <Stack
                  sx={{ alignItems: "center" }}
                  width={"inherit"}
                  direction={"row"}
                  spacing={1}
                >
                  <TextField
                    fullWidth
                    placeholder="write a message..."
                    sx={{
                      background: "white",
                      "&:hover": {
                        outline: "none",
                        border: "none",
                      },
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <LinkSimple
                              onClick={() =>
                                setShowAttachement(!ShowAttachement)
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <Smiley
                              onClick={() => setShowPicker(!showPicker)}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                  <Button type="submit" disabled={loadding}>
                    <IconButton
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "#5B96F7",
                        "&:hover": {
                          background: "#5B96F7",
                        },
                      }}
                    >
                      <PaperPlaneTilt size={25} color="white" />
                    </IconButton>
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Conversion;
