import {data} from './mock/mock';
import {MenuButtons, UpdateType, FilterType} from './utils/util'
import TripPresenter from './presenter/trip.js';
import FilterPresenter from "./presenter/filter.js";
import AppMenuView from './view/menu.js';
import RouteAndPriceView from './view/route-and-price.js';
import {render, RenderPosition, remove} from './utils/render.js';
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatsView from './view/stats';

const pointsModel = new PointsModel();
pointsModel.setPoints(data);

const filterModel = new FilterModel();


const tripMain = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControls, filterModel);
const appMenuComponent = new AppMenuView();

let statsComponent = null;

const handleSiteButtonClick = (menuButton) => {
  switch (menuButton) {
    case MenuButtons.TABLE:
      tripPresenter.init();
      remove(statsComponent);
      break;
    case MenuButtons.STATS:
      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      render(tripEvents, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

appMenuComponent.setMenuClickHandler(handleSiteButtonClick);
render(tripMain, new RouteAndPriceView(pointsModel.getPoints()), RenderPosition.AFTERBEGIN);
render(tripControls, appMenuComponent, RenderPosition.AFTERBEGIN);


filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
