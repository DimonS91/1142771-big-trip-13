import {data} from './mock/mock';
import PointPresenter from "./presenter/trip.js";

export let totalPrice = data.reduce((cur, acc) => {
  return cur + acc.price;
}, 0);

const tripMain = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

export const uniqueCity = [...new Set(data.map((elem) => elem.city))];

const pointPresenter = new PointPresenter(tripEvents, tripControls, tripMain);

pointPresenter.init(data);
