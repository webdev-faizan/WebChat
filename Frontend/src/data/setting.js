import {
  Bell,
  Lock,
  Key,
  PencilCircle,
  Image,
  ClipboardText,
  Article,
} from "phosphor-react";
export const setting = [
  {
    icon: <Bell size={24} />,
    text: "Notifications",
    to: "notifications",
  },
  {
    icon: <Lock size={24} />,
    text: "Privacy",
    to: "privacy",
  },
  {
    icon: <Key size={24} />,
    text: "Security",
    to: "Security",
  },
  {
    icon: <PencilCircle size={24} />,
    text: "Chat Wallpaper",
    to: "Chatwallpaper",
  },
  {
    icon: <Image size={24} />,
    text: "Request Account Info",
    to: "requestinfo",
  },
  {
    icon: <ClipboardText size={24} />,
    text: "Keyboard shortcuts",
  },
  {
    icon: <Article size={24} />,
    text: "Help",
    to: "help",
  },
];

export const notification = [
  {
    title: "Notifications",
    subTitle: "Show notifications for new messages",
    check: true,
  },
  {
    title: "Show Previews",
    subTitle: "",
    check: true,
  },
  {
    title: "Show Reaction Notifications",
    subTitle: "",
    check: true,
  },
  {
    title: "Incoming call ringtone",
    subTitle: "",
    check: true,
  },
  {
    title: "Sounds",
    subTitle: "Play sounds for incoming messages",
    check: true,
  },
];

export const privacy = [
  {
    title: "Last Seen",
    subTitle: "Everyone",
    type: "arrow",
    to: "LastSeen",
  },
  {
    title: "Profile Photo",
    subTitle: "Everyone",
    type: "arrow",
    to: "Profilephoto",
  },
  {
    title: "About",
    subTitle: "Everyone",
    type: "arrow",
    to: "About",
  },
  {
    title: "Read receipts",
    subTitle:
      "if turned off, you won’t send or receive read receipts. Read receipts are always sent  for group chats.",
    type: "check",
  },
  {
    title: "Groups",
    subTitle: "Everyone",
    type: "arrow",
    to: "Groups",
  },
  {
    title: "Blocked contacts",
    subTitle: "p",
    type: "arrow",
    to: "Blockedcontacts",
  },
];
