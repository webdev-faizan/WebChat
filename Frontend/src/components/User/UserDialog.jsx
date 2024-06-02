import React from "react";
import {
  Dialog,
  DialogContent,
  Slide,
  Stack,
  Tab,
  Tabs,
  IconButton,
  DialogTitle,
} from "@mui/material";
import { XCircle } from "phosphor-react";
import {
  FriendElement,
  FriendRequestElement,
  UserElement,
} from "./UserElemnets";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const UserDialog = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="xs"
      aria-describedby="alert-dialog-slide-description"
      open={open}
    >
      <DialogTitle>
        <IconButton sx={{ display: "block", marginLeft: "auto" }}>
          <XCircle size={24} onClick={() => handleClose()} />
        </IconButton>
        <Stack p={2} sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Explore" />
            <Tab label="Friends" />
            <Tab label="Requests" />
          </Tabs>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          height: "500px",
          overflowY: "auto",
        }}
      >
        {(() => {
          switch (value) {
            case 0:
              return <UserElement />;
            case 1:
              return <FriendElement handleClose={handleClose} />;
            case 2:
              return <FriendRequestElement />;
            default:
              <></>;
          }
        })()}
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
