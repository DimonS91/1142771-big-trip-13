import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._data = [];
  }

  setPoints(data) {
    this._data = data.slice();
  }

  getPoints() {
    return this._data;
  }

  updatePoint(updateType, update) {
    const index = this._data.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._data = [
      ...this._data.slice(0, index),
      update,
      ...this._data.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._data = [
      update,
      ...this._data
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._data.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._data = [
      ...this._data.slice(0, index),
      ...this._data.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
