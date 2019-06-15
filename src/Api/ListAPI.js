import faker from "faker";

export const GetListData = sampleSize => {
  return Array(sampleSize)
    .fill()
    .map((_, i) => faker.lorem.paragraph(1));
};
