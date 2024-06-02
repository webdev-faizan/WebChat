import { faker } from "@faker-js/faker";

export const calllog = [
  {
    id: 3,
    name: faker.name.firstName(),
    img: faker.image.avatar(),
    missed: false,
    audio: true,
    video: false,
  },
  {
    id: 1,
    name: faker.name.firstName(),
    img: faker.image.avatar(),
    missed: true,
    audio: true,
    video: false,
  },
  {
    id: 2,
    name: faker.name.firstName(),
    img: faker.image.avatar(),
    missed: true,
    audio: false,
    video: true,
  },
  {
    id: 3,
    name: faker.name.firstName(),
    img: faker.image.avatar(),
    missed: false,
    audio: true,
    video: false,
  },
];
