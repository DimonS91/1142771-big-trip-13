import {createRouteAndPrice} from './view/route-and-price';
import {createMenu} from './view/menu';
import {createFilters} from './view/filters';
import {createSortForm} from './view/sort';
import {createPointsList} from './view/list-points';
import {createWaypoints} from './view/waypoint';
import {createEditForm} from './view/edit-form';
// import {createNewForm} from './view/create-form';
import {data} from './mock/mock';


const WAYPOINTS_COUNT = 15;

// const waypoint = data;

// console.log(waypoint)

const renderMarkup = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const pageMain = document.querySelector(`main`);
const tripMain = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = pageMain.querySelector(`.trip-events`);


renderMarkup(tripMain, createRouteAndPrice(data[0]), `afterbegin`);
renderMarkup(tripControls, createMenu(), `afterbegin`);
renderMarkup(tripControls, createFilters(), `beforeend`);
renderMarkup(tripEvents, createPointsList(), `afterbegin`);
renderMarkup(tripEvents, createSortForm(), `afterbegin`);

const tripEventsList = document.querySelector(`.trip-events__list`);
renderMarkup(tripEventsList, createEditForm(data[0]), `afterbegin`);
for (let i = 0; i < WAYPOINTS_COUNT; i++) {
  renderMarkup(tripEventsList, createWaypoints(data[i]), `beforeend`);
}
