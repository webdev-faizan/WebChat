import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open_video_dialog: false,
  open_video_notification: false,
  incoming: false,
  connection: {
    signal: null,
  },
  requestToCall: null,
};
const slice = createSlice({
  name: "video",
  initialState: initialState,
  reducers: {
    incoming: (state, action) => {
      state.incoming = action.payload;
    },
    setOpenCloseCallNotification: (state, action) => {
      state.open_video_notification = action.payload;
    },
  },
});
export default slice.reducer;
export function SetOpenCloseVideoDialog(payload) {
  return async (disptach) => {
    disptach(slice.actions.SetOpenCloseVideoDialog(payload));
  };
}
export function incomingCall(payload) {
  return async (disptach) => {
    disptach(slice.actions.incoming(payload));
  };
}
