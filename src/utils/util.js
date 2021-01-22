import {generateDate} from './time';


export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomElements = (arr) => {
  return arr.filter(() => Math.random() >= 0.5);
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuButtons = {
  ADD_NEW_EVENT: `ADD_NEW_EVENT`,
  TABLE: `TABLE`,
  STATS: `STATS`,
};

const startEvent = generateDate();
const endEvent = generateDate();

export const newEvent = {
  point: `Bus`,
  city: ``,
  offer: [],
  startEvent: Math.min(startEvent, endEvent),
  endEvent: Math.max(startEvent, endEvent),
  price: 0,
  description: ``,
  photos: [],
  isFavorite: false
};
