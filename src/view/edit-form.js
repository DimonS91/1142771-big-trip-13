import dayjs from "dayjs";
import SmartView from "../view/smart.js";
import {typeUpdate, pointsUpdate, cityUpdate} from '../mock/trip-update.js';

const createEditForm = (data) => {
  const {point, city, description, startEvent, endEvent, price, offer, photos} = data;

  const renderOffers = offer.map(({title, price, isChecked}) => {
    return `
    <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-luggage" ${isChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${title}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
  }).join(``);

  const renderPhotos = (imageArr) => {
    return `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${imageArr.map((img) => `<img class="event__photo" src="${img}" alt="Event photo">`)}
    </div>
  </div>`;
  };

  const renderEventPoint = (type, isChecked) => {
    return `
    <div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${isChecked ? ` checked` : ``}>
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
      </div>`
    ;
  };

  return `
  <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${pointsUpdate.map((actualPoint) => renderEventPoint(actualPoint, point === actualPoint)).join(``)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${point}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(startEvent).format(`YYYY/MM/DD HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(endEvent).format(`YYYY/MM/DD HH:mm`)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${renderOffers}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    ${renderPhotos(photos)}
                  </section>
                </section>
              </form>
            </li>
  `;
};

export default class EditForm extends SmartView {
  constructor(data) {
    super();
    this._data = data;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEditForm(EditForm.parseEventToData(this._data));
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`click`, this._typeToggleHandler);

    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationToggleHandler);

    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      point: evt.target.textContent,
      offer: typeUpdate[evt.target.textContent]
    });
  }


  _destinationToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value,
      photos: cityUpdate[evt.target.value][0].photos,
      description: cityUpdate[evt.target.value][0].description
    });
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData(
        {
          price: evt.target.value,
        }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditForm.parseDataToEvent(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formSubmitHandler);

  }

  static parseEventToData(data) {
    return Object.assign(
        {},
        data,
        {
          isOffers: data.offer.length > 0,
          isPhotos: data.photos.length > 0
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isOffers;
    delete data.isPhotos;

    return data;
  }
}
