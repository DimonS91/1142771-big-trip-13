import SortFormView from '../view/sort.js';
import EmptyListView from '../view/list-empty.js';
import PointsListView from '../view/list-points.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/util.js';
import {render, RenderPosition} from "../utils/render.js";
import {SortType, sortEventTime, sortEventPrice, sortEventDay} from '../view/sort.js';

export default class Trip {
  constructor(pointContainer) {
    this._data = null;
    this._pointContainer = pointContainer;
    this._tripPresenter = {};
    this._currentSortType = SortType.DAY;

    this._pointsComponent = new PointsListView();
    this._sortComponent = new SortFormView();
    this._noPointsComponent = new EmptyListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(data) {
    this._data = data;
    this._sourcedTripData = data;

    render(this._pointContainer, this._pointsComponent, RenderPosition.AFTERBEGIN);
    this._renderPoints();
    this._renderSort();
  }

  _sortPoint(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._data.sort(sortEventDay);
        break;
      case SortType.TIME:
        this._data.sort(sortEventTime);
        break;
      case SortType.PRICE:
        this._data.sort(sortEventPrice);
        break;
      default:
        this._data = this._sourcedTripData;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoint(sortType);
    this._clearPoints();
    this._renderPoints();
  }

  _renderSort() {
    render(this._pointContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _clearPoints() {
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPresenter = {};
    this._renderedPointCount = 15;
  }

}
