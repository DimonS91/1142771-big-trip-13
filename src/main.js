import {data} from './mock/mock';
import TripPresenter from './presenter/trip.js';
import AppMenuView from './view/menu.js';
import FilterView from './view/filters.js';
import RouteAndPriceView from './view/route-and-price.js';
import {render, RenderPosition} from './utils/render.js';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripControls, new AppMenuView(), RenderPosition.AFTERBEGIN);
render(tripControls, new FilterView(), RenderPosition.BEFOREEND);
render(tripMain, new RouteAndPriceView(data), RenderPosition.AFTERBEGIN);

const pointPresenter = new TripPresenter(tripEvents);

pointPresenter.init(data);
