import AbstractView from "./abstract.js";
import {MenuButtons} from '../utils/util';

const createMenu = () => {
  return `
  <nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-value="${MenuButtons.TABLE}">Table</a>
  <a class="trip-tabs__btn" href="#" data-value="${MenuButtons.STATS}">Stats</a>
</nav>
  `;
};

export default class AppMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenu();
  }

  _menuClickHandler(evt) {
    if (evt.target.classList.contains(`trip-tabs__btn`)) {
      evt.preventDefault();

      const menuItem = evt.target.textContent;

      this.setMenuItem(menuItem);
      this._callback.menuClick(menuItem);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuButton) {
    const currentActiveItem = this.getElement().querySelector(`.trip-tabs__btn--active`);
    currentActiveItem.classList.remove(`trip-tabs__btn--active`);

    const item = this.getElement().querySelector(`[data-value=${menuButton}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
