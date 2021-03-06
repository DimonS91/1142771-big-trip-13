import AbstractView from "./abstract.js";
import dayjs from "dayjs";

export const SortType = {
  DAY: `day`,
  TIME: `time`,
  PRICE: `price`
};

export const sortEventDay = (eventA, eventB) => {
  return eventA.startEvent - eventB.startEvent;
};

export const sortEventTime = (eventA, eventB) => {
  const diffEventA = dayjs(eventA.startEvent).diff(dayjs(eventA.endEvent));
  const diffEventB = dayjs(eventB.endEvent).diff(dayjs(eventB.startEvent));
  return diffEventA - diffEventB;
};

export const sortEventPrice = (eventA, eventB) => {
  return eventA.price - eventB.price;
};

const createSortForm = (currentSortType) => {
  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortType.DAY ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortType.DAY}">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortType.TIME ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.TIME}">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortType.PRICE ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.PRICE}">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>
  `;
};

export default class SortForm extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortForm(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
