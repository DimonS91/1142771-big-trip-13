// import {data} from './mock/mock';
import {MenuButtons, UpdateType} from './utils/util';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from "./presenter/filter.js";
import AppMenuView from './view/menu.js';
import RouteAndPriceView from './view/route-and-price.js';
import {render, RenderPosition, remove} from './utils/render.js';
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatsView from './view/stats';
import NewEventBtnView from './view/btn-new-event';
import Api from "./api.js";
import Store from './store';

const ApiSetting = {
  AUTHORIZATION: `Basic uPPfBqH6eLUwe0s`,
  END_POINT: `https://13.ecmascript.pages.academy/big-trip`
};

const api = new Api(ApiSetting.END_POINT, ApiSetting.AUTHORIZATION);
const pointsModel = new PointsModel();
const filterModel = new FilterModel();


const tripMain = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControls, filterModel);
const appMenuComponent = new AppMenuView();
const newEventBtnComponent = new NewEventBtnView();

let statsComponent = null;

const handleSiteButtonClick = (menuButton) => {
  switch (menuButton.toUpperCase()) {
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

render(tripMain, new RouteAndPriceView(pointsModel.getPoints()), RenderPosition.AFTERBEGIN);
render(tripMain, newEventBtnComponent, RenderPosition.BEFOREEND);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  remove(statsComponent);
  appMenuComponent.setMenuItem(MenuButtons.TABLE);
  tripPresenter.init();
  tripPresenter.createEvent(() => {
    evt.target.disabled = false;
  });
  evt.target.disabled = true;
});

Promise.all([api.getPoints(), api.getOffers(), api.getDestinations()])
.then(([events, offers, city]) => {
  Store.setOffers(offers);
  Store.setDestinations(city);
  pointsModel.setPoints(UpdateType.INIT, events);
  render(tripControls, appMenuComponent, RenderPosition.AFTERBEGIN);
  appMenuComponent.setMenuClickHandler(handleSiteButtonClick);
}).catch((err) => {
  console.log(err)
  pointsModel.setPoints(UpdateType.INIT, []);
  render(tripControls, appMenuComponent, RenderPosition.AFTERBEGIN);
  appMenuComponent.setMenuClickHandler(handleSiteButtonClick);
});
