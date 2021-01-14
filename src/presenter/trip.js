import SortFormView from '../view/sort.js';
import EmptyListView from '../view/list-empty.js';
import PointsListView from '../view/list-points.js';
import PointPresenter from './point.js';
import {remove, render, RenderPosition} from "../utils/render.js";
import {SortType, sortEventTime, sortEventPrice, sortEventDay} from '../view/sort.js';
import {UserAction, UpdateType, FilterType} from "../utils/util.js";
import {filter} from "../utils/filter.js";
import NewPointPresenter from "./add-point";

export default class Trip {
  constructor(pointContainer, pointsModel, filterModel) {
    this._pointContainer = pointContainer;
    this._data = null;
    this._sourcedTripData = null;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._tripPresenter = {};
    this._renderedPointCount = 15;
    this._currentSortType = SortType.DAY;

    this._pointsComponent = new PointsListView();
    this._sortComponent = null;
    this._noPointsComponent = new EmptyListView();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newPointPresenter = new NewPointPresenter(this._pointsComponent, this._handleViewAction);
  }

  init() {
    render(this._pointContainer, this._pointsComponent, RenderPosition.AFTERBEGIN);
    this._renderBoard();

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  createEvent() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newPointPresenter.init();
  }

  destroy() {
    this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});

    remove(this._pointsComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const events = this._pointsModel.getPoints();
    const filtredEvents = filter[filterType](events);
    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredEvents.sort(sortEventDay);
      case SortType.TIME:
        return filtredEvents.sort(sortEventTime);
      case SortType.PRICE:
        return filtredEvents.sort(sortEventPrice);
    }
    return filtredEvents;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();

  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortFormView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._pointContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _handleModeChange() {
    this._newPointPresenter.destroy();
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._tripPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _renderPoints() {
    if (this._getPoints().length === 0) {
      this._renderNoPoints();
    } else {
      this._getPoints().forEach((point) => {
        this._renderEvent(point);
      });
    }
  }

  _renderNoPoints() {
    render(this._pointContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(data) {
    const pointPresenter = new PointPresenter(this._pointsComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(data);
    this._tripPresenter[data.id] = pointPresenter;
  }

  _clearPoints() {
    this._newPointPresenter.destroy();
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPresenter = {};
    this._renderedPointCount = 15;
  }

  _clearBoard({resetRenderedPointCount = false, resetSortType = false} = {}) {
    const pointCount = this._getPoints().length;

    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointsComponent);


    if (resetRenderedPointCount) {
      this._renderedPointCount = 15;
    } else {
      this._renderedPointCount = Math.min(pointCount, this._renderedPointCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DAY;

    }
  }

  _renderBoard() {
    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(points.slice(0, Math.min(pointCount, this._renderedPointCount)));
  }
}


