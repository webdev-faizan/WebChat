import { faker } from "@faker-js/faker";

const Media = [
  {
    type: "time",
    text: "27th Oct 22",
  },
  {
    type: "msg",
    subType: "img",
    src: faker.image.abstract(),
  },
  {
    type: "msg",
    subType: "img",
    src: faker.image.abstract(),
  },
  {
    type: "msg",
    subType: "img",
    src: faker.image.abstract(),
  },
  {
    type: "msg",
    subType: "img",
    src: faker.image.abstract(),
  },
  {
    type: "msg",
    subType: "img",
    src: faker.image.abstract(),
  },
  {
    type: "time",
    text: "24th Oct 22",
  },
  {
    type: "msg",
    subType: "img",
    src: faker.image.abstract(),
  },
  {
    type: "msg",
    subType: "img",
    src: faker.image.abstract(),
  },
  {
    type: "msg",
    subType: "img",
    src: faker.image.abstract(),
  },
  {
    type: "msg",
    subType: "img",
    src: faker.image.abstract(),
  },
];

const link = [
  {
    type: "time",
    text: "24th Oct 22",
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.abstract(),
    link: "https://www.upwork.com/freelancers/~01fd17d7943d98645a?s=1110580755057594368",
  },
  {
    type: "time",
    text: "24th Oct 22",
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.abstract(),
    link: "https://www.upwork.com/freelancers/~01fd17d7943d98645a?s=1110580755057594368",
  },
  {
    type: "time",
    text: "24th Oct 22",
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.abstract(),
    link: "https://www.upwork.com/freelancers/~01fd17d7943d98645a?s=1110580755057594368",
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.abstract(),
    link: "https://www.upwork.com/freelancers/~01fd17d7943d98645a?s=1110580755057594368",
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.abstract(),
    link: "https://www.upwork.com/freelancers/~01fd17d7943d98645a?s=1110580755057594368",
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.abstract(),
    link: "https://www.upwork.com/freelancers/~01fd17d7943d98645a?s=1110580755057594368",
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.abstract(),
    link: "https://www.upwork.com/freelancers/~01fd17d7943d98645a?s=1110580755057594368",
  },
];

const doc = [
  {
    type: "time",
    text: "24th Oct 22",
  },
  {
    type: "msg",
    subtype: "doc",
    preview: faker.image.abstract(),
    filename: "Abstract.png",
  },
  {
    type: "msg",
    subtype: "doc",
    preview: faker.image.abstract(),
    filename: "Abstract.png",
  },
  {
    type: "msg",
    subtype: "doc",
    preview: faker.image.abstract(),
    filename: "Abstract.png",
  },
  {
    type: "time",
    text: "24th Oct 22",
  },
  {
    type: "msg",
    subtype: "doc",
    preview: faker.image.abstract(),
    filename: "Abstract.png",
  },
];
export { Media, link, doc };
