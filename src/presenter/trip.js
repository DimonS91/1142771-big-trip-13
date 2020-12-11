import RouteAndPriceView from '../view/route-and-price';
import AppMenuView from '../view/menu';
import FilterView from '../view/filters';
import SortFormView from '../view/sort';
import EmptyListView from '../view/list-empty';
import PointsListView from '../view/list-points';
import PointPresenter from './point.js';
import {updateItem} from '../mock/mock.js';
import {render, RenderPosition} from "../utils/render.js";


export default class Trip {
  constructor(pointContainer, menuContainer, routeAndPriceContainer) {
    this._pointContainer = pointContainer;
    this._menuContainer = menuContainer;
    this._routeAndPriceContainer = routeAndPriceContainer;
    this._pointPresenter = {};

    this._pointsComponent = new PointsListView();
    this._sortComponent = new SortFormView();
    this._filterComponent = new FilterView();
    this._noPointsComponent = new EmptyListView();
    this._menuComponent = new AppMenuView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(data) {
    this._data = data.slice();

    render(this._pointContainer, this._pointsComponent, RenderPosition.AFTERBEGIN);
    this._renderPoints();
    this._renderRouteAndPrice(this._data);
    this._renderMenu();
    this._renderFilter();

  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._data = updateItem(this._data, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderMenu() {
    render(this._menuContainer, this._menuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilter() {
    render(this._menuContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }


  _renderRouteAndPrice(data) {
    const routeAndPrice = new RouteAndPriceView(data);
    render(this._routeAndPriceContainer, routeAndPrice, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._pointContainer, this._sortComponents, RenderPosition.AFTERBEGIN);
  }

  _renderPoints(from, to) {
    if (this._data.length === 0) {
      this._renderNoPoints();
    } else {
      this._data.slice(from, to).forEach((point) => {
        this._renderEvent(point);
      });
    }
  }

  _renderNoPoints() {
    render(this._pointContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(data) {
    const pointPresenter = new PointPresenter(this._pointsComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(data);
    this._pointPresenter[data.id] = pointPresenter;
  }

  _clearTaskList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    this._renderedPointCount = 15;
  }

}
