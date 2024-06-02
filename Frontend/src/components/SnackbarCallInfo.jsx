import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { CallNotifcation } from "../redux/app";

export default function PositionedSnackbar() {
  const { callNotifcation } = useSelector((state) => state.app);
  const disptach = useDispatch();

  const [state] = React.useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;
  const CloseSnackbar = () => {
    disptach(CallNotifcation({ showNotifcation: false, message: "" }));
  };
  const { showNotifcation, message } = callNotifcation;
  React.useEffect(() => {
    if (showNotifcation) {
      const timer = setTimeout(() => {
        CloseSnackbar();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showNotifcation]);

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        severity="success"
        anchorOrigin={{ vertical, horizontal }}
        open={showNotifcation}
        message={message}
        onClick={() => CloseSnackbar()}
        key={vertical + horizontal}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    </Box>
  );
}
