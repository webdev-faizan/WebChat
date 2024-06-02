import { faker } from "@faker-js/faker";

import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

const NavButton = [
  {
    index: 0,
    to: "/c#load",
    icon: <ChatCircleDots />,
  },
  // {
  //   to: "/group",
  //   index: 1,
  //   icon: <Users />,
  // },
  // {
  //   to: "/callhistory",
  //   index: 2,
  //   icon: <Phone />,
  // },
];

const chatlist = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:0",
    unread: 0,
    pinned: true,
    online: true,
  },
];

const chat_history = [
  {
    type: "divider",
    text: "Yesterday",
  },
  {
    type: "msg",
    message: "hello ✋",
    incoming: true,
    outgoing: false,
  },

  {
    type: "msg",
    message: "Hii",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "how are you 😇",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "how are you 😇",
    message: "I am good and you",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Tday",
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.abstract(),
    link: "https://www.upwork.com/freelancers/~01fd17d7943d98645a?s=1110580755057594368",
    message: "yes i also can do that",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "img",
    message: "here you go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "great drawing",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "check this pdf",
    preview: faker.image.abstract(),
    filename: "Abstract.png",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "this is a repy",
    message: "yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
];
const message_options = [
  {
    title: "reply",
  },
  {
    title: "React to Message",
  },
  {
    title: "Forward to message",
  },
  {
    title: "Start message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];
export { NavButton, chat_history, chatlist, message_options };
