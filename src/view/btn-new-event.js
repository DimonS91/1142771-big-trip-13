import AbstractView from "./abstract.js";

const createNewEventBtn = () => {
  return `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `;
};

export default class NewEventBtn extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createNewEventBtn();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
