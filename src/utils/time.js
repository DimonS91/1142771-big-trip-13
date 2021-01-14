import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {getRandomInteger} from './util.js';
dayjs.extend(duration);

export const generateDate = () => {
  return (
    Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000
  );
};

export const getTime = (start, end) => {
  const diff = dayjs(end).diff(dayjs(start));
  const days = dayjs.duration(diff).days().toString();
  const hours = dayjs.duration(diff).hours().toString();
  const minutes = dayjs.duration(diff).minutes().toString();
  return `${days > 0 ? days + `D` : ``} ${hours > 0 ? hours + `H` : ``} ${minutes}M`;
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, `D`);
};

export const isEventPast = (date) => {
  return dayjs(date).diff(dayjs()) < 0;
};

export const isEventFuture = (date) => {
  return dayjs(date).diff(dayjs()) >= 0;
};
