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
import {render, RenderPosition, replace} from "./utils/render.js";

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
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditPointToPoint = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditPointToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };


  eventComponent.setEditClickHandler(() => {
    replacePointToEditPoint();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setEditClickHandler(() => {
    replaceEditPointToPoint();
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceEditPointToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

render(tripMain, new RouteAndPriceView(data[0]), RenderPosition.AFTERBEGIN);
render(tripControls, new AppMenuView(), RenderPosition.AFTERBEGIN);
render(tripControls, new FilterView(), RenderPosition.BEFOREEND);
render(tripEvents, pointsListComponent, RenderPosition.AFTERBEGIN);
render(tripEvents, new SortFormView(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < WAYPOINTS_COUNT; i++) {
  renderEvent(pointsListComponent, data[i]);
}
if (WAYPOINTS_COUNT === 0) {
  render(tripEvents, new EmptyListView(), RenderPosition.BEFOREEND);
}
