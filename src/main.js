import RouteAndPriceView from './view/route-and-price';
import AppMenuView from './view/menu';
import FilterView from './view/filters';
import SortFormView from './view/sort';
import EmptyListView from './view/list-empty';
import PointsListView from './view/list-points';
import WaypointsView from './view/waypoint';
import EditFormView from './view/edit-form';
// import {createNewForm} from './view/create-form';
import {data} from './mock/mock';
import {render, RenderPosition} from "./utils";

const WAYPOINTS_COUNT = 15;

const pageMain = document.querySelector(`main`);
const tripMain = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = pageMain.querySelector(`.trip-events`);
const pointsListComponent = new PointsListView();

const renderEvent = (eventListElement, point) => {
  const eventComponent = new WaypointsView(point);
  const eventEditComponent = new EditFormView(point);

  const replacePointToEditPoint = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditPointToPoint = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditPointToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToEditPoint();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditPointToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

render(tripMain, new RouteAndPriceView(data[0]).getElement(), RenderPosition.AFTERBEGIN);
render(tripControls, new AppMenuView().getElement(), RenderPosition.AFTERBEGIN);
render(tripControls, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, pointsListComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripEvents, new SortFormView().getElement(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < WAYPOINTS_COUNT; i++) {
  renderEvent(pointsListComponent.getElement(), data[i]);
}
if (WAYPOINTS_COUNT === 0) {
  render(tripEvents, new EmptyListView().getElement(), RenderPosition.BEFOREEND);
}
