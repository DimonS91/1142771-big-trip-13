import dayjs from "dayjs";
import {getRandomInteger} from './util.js';

export const generateDate = () => {
  return (
    Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000
  );
};

export const getTime = (start, end) => {
  const timeDiff = dayjs(end).diff(dayjs(start));
  if (dayjs(timeDiff).format(`DD`) > 0) {
    return dayjs(timeDiff).utc().format(`DD[D]:HH[H]:mm[M]`);
  } else if (dayjs(timeDiff).format(`DD`) === 0 && dayjs(timeDiff).format(`HH`) > 0) {
    return dayjs(timeDiff).utc().format(`HH[H]:mm[M]`);
  } else {
    return dayjs().utc().format(`mm[M]`);
  }
};
