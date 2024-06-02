import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-toastify";
const initialState = {
  sideBar: {
    open: false,
    type: "CONTACT",
  },
  snackbar: {
    open: false,
    message: "",
  },
  alluser: [],
  friends: [],
  requestToConnected: [],
  roomId: null,
  sentMessageInfo: {},
  chatType: null,
  callNotifcation: {
    showNotifcation: false,
    message: "",
  },
  showVideo: false,
  showAudio: false,
  userInfo: {
    email: "",
    fullname: "",
    createdAt: "",
    avatar: "",
  },
  callUserInfo: {
    Username: "",
    profileImage: "",
  },
};

export const Slice = createSlice({
  name: "app",
  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSidebarTap: (state, action) => {
      state.sideBar.type = action.payload.type;
    },
    showShackbar: (state, action) => {
      state.snackbar.open = action.payload.open;
      state.snackbar.message = action.payload.message;
    },
    CallNotifcation: (state, action) => {
      state.callNotifcation.showNotifcation =
        action.payload.ShowCallNotifcation;
      state.callNotifcation.message = action.payload.message;
      state.showVideo = false;
      state.showAudio = false;
    },
    allUser: (state, action) => {
      state.alluser = action.payload.allUsers;
    },
    friends: (state, action) => {
      state.friends = action.payload.friends;
    },
    requestToConnected: (state, action) => {
      state.requestToConnected = action.payload.requestToConnected;
    },
    selectConversation: (state, action) => {
      state.chatType = "individual";
      state.sentMessageInfo.roomId = action.payload.roomId;
      state.sentMessageInfo.from = action.payload.from;
    },
    showVideo: (state, action) => {
      state.showVideo = action.payload;
    },
    showAudio: (state, action) => {
      state.showAudio = action.payload;
    },
    AddUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        avatar: action.payload,
      };
    },
    setCallUserInfo: (state, action) => {
      state.callUserInfo.Username = action.payload.Username;
      state.callUserInfo.profileImage = action.payload.profileImage;
    },
  },
});

export default Slice.reducer;

export function toggleSidebar() {
  return async (disptach) => {
    disptach(Slice.actions.toggleSidebar());
  };
}
export function updateSidebarTap(type) {
  return async (disptach) => {
    return disptach(Slice.actions.updateSidebarTap({ type }));
  };
}

export function showSnackBar(snackbarShowInfo) {
  return async (disptach) => {
    disptach(
      Slice.actions.showShackbar({
        open: snackbarShowInfo.open,
        message: snackbarShowInfo.message,
      })
    );
    setTimeout(() => {
      disptach(Slice.actions.showShackbar({ open: false, message: "" }));
    }, 5000);
  };
}
export function FetchAllUsers() {
  return async (disptach, state) => {
    try {
      await axiosInstance
        .get("/user/unconnectedusers", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          return disptach(Slice.actions.allUser({ allUsers: resp.data.data }));
        });
    } catch (error) {
      toast.error(error?.response?.message, {
        autoClose: 1200,
      });
    }
  };
}
export function FetchFriends() {
  return async (disptach) => {
    try {
      const { data } = await axiosInstance.get("user/connectedusers", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      disptach(Slice.actions.friends({ friends: data.data }));
    } catch (error) {
      toast.error(error?.response?.message, {
        autoClose: 1200,
      });
    }
  };
}

export function FetchRequestToConnectedFriends() {
  return async (disptach) => {
    try {
      const { data } = await axiosInstance.get("/user/requestconnectedusers");
      disptach(
        Slice.actions.requestToConnected({ requestToConnected: data.data })
      );
    } catch (error) {
      toast.error(error?.response?.message, {
        autoClose: 1200,
      });
    }
  };
}

export function SelectConversation({ roomId, userId }) {
  return (disptach) => {
    disptach(Slice.actions.selectConversation({ roomId, from: userId }));
  };
}
//!shwo call notifcation info
export function CallNotifcation(payload) {
  return (disptach) => {
    disptach(Slice.actions.CallNotifcation(payload));
  };
}

export function ShowVideo(payload) {
  return async (disptach) => {
    disptach(Slice.actions.showVideo(payload));
  };
}
export function ShowAudio(payload) {
  return async (disptach) => {
    disptach(Slice.actions.showAudio(payload));
  };
}
export function AddUserInfo(payload) {
  return async (disptach) => {
    disptach(Slice.actions.AddUserInfo(payload));
  };
}
export function UpdateUserInfo(payload) {
  return async (disptach) => {
    disptach(Slice.actions.updateUserInfo(payload));
  };
}
export function SetCallUserInfo(payload) {
  return async (disptach) => {
    disptach(Slice.actions.setCallUserInfo(payload));
  };
}
