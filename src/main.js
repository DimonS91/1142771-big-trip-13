import {createRouteAndPrice} from './view/route-and-price';
import {createMenu} from './view/menu';
import {createFilters} from './view/filters';
import {createSortForm} from './view/sort';
import {createPointsList} from './view/list-points';
import {createWaypoints} from './view/waypoint';
import {createEditForm} from './view/edit-form';

const renderMarkup = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const pageMain = document.querySelector(`main`);
const tripMain = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = pageMain.querySelector(`.trip-events`);


renderMarkup(tripMain, createRouteAndPrice(), `afterbegin`);
renderMarkup(tripControls, createMenu(), `afterbegin`);
renderMarkup(tripControls, createFilters(), `beforeend`);
renderMarkup(tripEvents, createPointsList(), `afterbegin`);
renderMarkup(tripEvents, createSortForm(), `afterbegin`);

const NUMBER_POINTS = 3;
const tripEventsList = document.querySelector(`.trip-events__list`);
renderMarkup(tripEventsList, createEditForm(), `afterbegin`);
for (let i = 0; i < NUMBER_POINTS; i++) {
  renderMarkup(tripEventsList, createWaypoints(), `beforeend`);
}


