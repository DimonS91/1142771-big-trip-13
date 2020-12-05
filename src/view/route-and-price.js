import dayjs from "dayjs";
import AbstractView from "./abstract.js";

const createRouteAndPrice = (data) => {
  const {startEvent, endEvent} = data;
  return `
  <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">${dayjs(startEvent).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(endEvent).format(`DD`)}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
  </section>
  `;
};

export default class RouteAndPrice extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createRouteAndPrice(this._data);
  }
}

