import { Grid, IconButton, Link, Stack } from "@mui/material";
import { Box, borderRadius } from "@mui/system";
import { ArrowLeft } from "phosphor-react";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { faker } from "@faker-js/faker";
import { Media, link, doc } from "../../data/SharedMessages";
import { DownloadSimple, Image, DotsThreeVertical } from "phosphor-react";
import { useDispatch } from "react-redux";
import { updateSidebarTap } from "../../redux/app";

const SharedMessages = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

  function CustomTabPanel({ children, index }) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <Stack>
      <Box
        height={80}
        sx={{
          marginLeft: "-4px",
          width: "308px",
          marginTop: "-4px",
          boxShadow: " 0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          background: "#F8FAFF",
          display: "flex",
          alignItems: "center",
          paddingLeft: "30px",
        }}
      >
        <IconButton onClick={() => dispatch(updateSidebarTap("CONTACT"))}>
          <ArrowLeft size={24} />
        </IconButton>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            TabIndicatorProps={{ style: { display: "none" } }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Media" {...a11yProps(0)} />
            <Tab label="Links" {...a11yProps(1)} />
            <Tab label="Docs" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel index={0}>
          <Grid container spacing={2}>
            {Media.map((ele) => {
              const { type, text, src, subType } = ele;

              switch (type) {
                case "msg": {
                  if (subType == "img") {
                    return (
                      <Grid item xs={4}>
                        <img
                          src={src}
                          width={79}
                          height={79}
                          style={{
                            objectFit: "cover",
                          }}
                          alt=""
                        />
                      </Grid>
                    );
                  }
                }
                case "time": {
                  return (
                    <Grid item xs={12}>
                      {text}
                    </Grid>
                  );
                }
                default: {
                  return null;
                }
              }
            })}
          </Grid>
        </CustomTabPanel>

        <CustomTabPanel index={1}>
          <Grid container spacing={2}>
            {link.map((ele) => {
              const { type, text, src, subtype, link } = ele;

              switch (type) {
                case "msg": {
                  if (subtype == "link") {
                    return (
                      <Grid item xs={12}>
                        <Stack spacing={1}>
                          <img
                            src={ele.preview}
                            style={{ width: "201px", height: "183px" }}
                          />
                          <Typography variant="subtitle2">
                            creating chating app
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            component={Link}
                            href={ele.link}
                            target="_faizan"
                          >
                            Upwork
                          </Typography>

                          <Typography
                            variant="subtitle2"
                            color={ele.incoming ? "#696969" : "#FFF"}
                          >
                            yep
                          </Typography>
                        </Stack>
                      </Grid>
                    );
                  }
                }
                case "time": {
                  return (
                    <Grid item xs={12}>
                      {text}
                    </Grid>
                  );
                }
              }
            })}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel index={2}>
          <Grid container spacing={2}>
            {doc.map((ele) => {
              const { type, text, subtype, filename } = ele;

              switch (type) {
                case "msg": {
                  if (subtype == "doc") {
                    return (
                      <Grid item xs={12}>
                        <Stack spacing={1}>
                          <Stack
                            spacing={2}
                            direction={"row"}
                            alignItems={"center"}
                          >
                            <Image size={48} color="gray" />
                            <Typography variant="caption" color={"#696969"}>
                              {" "}
                              {filename}
                            </Typography>
                            <IconButton>
                              <DownloadSimple />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Grid>
                    );
                  }
                }
                case "time": {
                  return (
                    <Grid item xs={12}>
                      {text}
                    </Grid>
                  );
                }
              }
            })}
          </Grid>
        </CustomTabPanel>
      </Box>
    </Stack>
  );
};

export default SharedMessages;
