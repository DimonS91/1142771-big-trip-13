import AbstractView from "./abstract.js";

const createPointsList = () => {
  return `
  <ul class="trip-events__list">
  </ul>
  `;
};

export default class PointsList extends AbstractView {
  getTemplate() {
    return createPointsList();
  }
}
