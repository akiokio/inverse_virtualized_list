import faker from "faker";
import { List, Map } from "immutable";

export const GetListData = sampleSize => {
  return List(
    Array(sampleSize)
      .fill()
      .map((_, i) =>
        Map({
          localIndex: i + 1,
          content: faker.lorem.paragraph(1),
          createdAt: new Date()
        })
      )
  );
};
