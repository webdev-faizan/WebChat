import { faker } from "@faker-js/faker";

export const starMessages = [
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
];
