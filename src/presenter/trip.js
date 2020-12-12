import SortFormView from '../view/sort.js';
import EmptyListView from '../view/list-empty.js';
import PointsListView from '../view/list-points.js';
import PointPresenter from './point.js';
import {updateItem} from '../mock/mock.js';
import {render, RenderPosition} from "../utils/render.js";


export default class Trip {
  constructor(pointContainer) {
    this._data = null;
    this._pointContainer = pointContainer;
    this._tripPresenter = {};

    this._pointsComponent = new PointsListView();
    this._sortComponent = new SortFormView();
    this._noPointsComponent = new EmptyListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(data) {
    this._data = data;

    render(this._pointContainer, this._pointsComponent, RenderPosition.AFTERBEGIN);
    this._renderPoints();
    this._renderSort();
  }

  _renderSort() {
    render(this._pointContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _handleModeChange() {
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._data = updateItem(this._data, updatedPoint);
    this._tripPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderPoints() {
    if (this._data.length === 0) {
      this._renderNoPoints();
    } else {
      this._data.slice().forEach((point) => {
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
    this._tripPresenter[data.id] = pointPresenter;
  }

  _clearTaskList() {
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPresenter = {};
    this._renderedPointCount = 15;
  }

}
