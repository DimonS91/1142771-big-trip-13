import dayjs from "dayjs";
import AbstractView from "./abstract.js";

const createRouteAndPrice = (data) => {
  const {startEvent, endEvent} = data;
  const totalPrice = data.reduce((cur, acc) => {
    return cur + acc.price;
  }, 0);

  const uniqueCity = [...new Set(data.map((elem) => elem.city))];

  return `
  <section class="trip-main__trip-info  trip-info">
             <div class="trip-info__main">
             <h1 class="trip-info__title">${uniqueCity.length > 3 ? `${uniqueCity[0]} &mdash; ...  &mdash; ${uniqueCity[uniqueCity.length - 1]}` :
    `${uniqueCity[0]} &mdash; ${uniqueCity[1]} &mdash; ${uniqueCity[2]}`}</h1>

              <p class="trip-info__dates">${dayjs(startEvent).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(endEvent).format(`DD`)}</p>
            </div>

            <p class="trip-info__cost">
               Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
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
