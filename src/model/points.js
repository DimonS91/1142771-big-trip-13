/* eslint-disable camelcase */
import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._data = [];
    this._destinations = [];
    this._offers = [];
  }

  setPoints(updateType, data) {
    this._data = data.slice();
    this._notify(updateType);
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

  static adaptToClient(data) {
    const adaptedPoint = Object.assign(
        {},
        data,
        {
          point: data.type,
          city: data.destination.name,
          startEvent: data.date_from,
          endEvent: data.date_to,
          price: data.base_price,
          description: data.destination.description,
          photos: data.destination.pictures,
          isFavorite: data.is_favorite
        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.destination;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.offers;
    delete adaptedPoint.type;

    return adaptedPoint;
  }

  static adaptToServer(data) {
    const adaptedPoint = Object.assign(
        {},
        data,
        {
          base_price: data.price,
          date_from: data.startEvent,
          date_to: data.endEvent,
          destination: {
            description: data.description,
            name: data.city,
            pictures: data.photos,
          },
          is_favorite: data.isFavorite,
          type: data.point
        }
    );

    delete adaptedPoint.price;
    delete adaptedPoint.times;
    delete adaptedPoint.description;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }

}

