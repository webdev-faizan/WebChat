import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { showSnackBar } from "../redux/app";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const { snackbar } = useSelector((state) => state.app);
  const disptach = useDispatch();
  const CloseSnackbar = () => {
    disptach(showSnackBar({ open: false, message: "" }));
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={CloseSnackbar}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClick={CloseSnackbar}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
