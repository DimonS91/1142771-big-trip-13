import dayjs from "dayjs";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import SmartView from "./smart.js";

const BAR_HEIGHT = 55;

const uniqueItems = (items) => [...new Set(items)];

const countMoneyByType = (events, point) => {
  const typeEvents = events.filter((event) => event.point === point);
  return typeEvents.reduce((sum, event) => sum + event.price, 0);
};

export const countByType = (events, point) => {
  const typeEvents = events.filter((event) => event.point === point);
  return typeEvents.length;
};

export const countDurationByType = (events, point) => {
  const typeEvents = events.filter((event) => event.point === point);
  return typeEvents.reduce((sum, event) => {
    const diff = dayjs(event.endEvent).diff(dayjs(event.startEvent));
    const days = dayjs.duration(diff).days();
    return sum + days;
  }, 0);
};

const renderMoneyChart = (moneyCtx, events) => {
  const eventsTypes = events.map((event) => event.point);
  const uniqTypes = uniqueItems(eventsTypes);
  const moneyByTypes = uniqTypes.map((type) => countMoneyByType(events, type));

  moneyCtx.height = uniqTypes.length * BAR_HEIGHT;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: moneyByTypes,
        backgroundColor: `#2E9AFF`,
        hoverBackgroundColor: `#2EAEFF`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#ffffff`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (val) => `${val.toUpperCase()}`
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTypeChart = (typeCtx, events) => {
  const eventsTypes = events.map((event) => event.point);
  const uniqTypes = uniqueItems(eventsTypes);
  const countsByTypes = uniqTypes.map((type) => countByType(events, type));

  typeCtx.height = uniqTypes.length * BAR_HEIGHT;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: countsByTypes,
        backgroundColor: `#2E9AFF`,
        hoverBackgroundColor: `#2EAEFF`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#ffffff`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (val) => `${val.toUpperCase()}`
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: BAR_HEIGHT,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeCtx, events) => {
  const eventsTypes = events.map((event) => event.point);
  const uniqTypes = uniqueItems(eventsTypes);
  const durationsByTypes = uniqTypes.map((type) => countDurationByType(events, type));

  timeCtx.height = uniqTypes.length * BAR_HEIGHT;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: durationsByTypes,
        backgroundColor: `#2E9AFF`,
        hoverBackgroundColor: `#2EAEFF`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#ffffff`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}D`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (val) => `${val.toUpperCase()}`
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatsTemplate = () => {
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart statistics__chart--money" width="900" ></canvas>
    </div>
    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart statistics__chart--transport" width="900"></canvas>
    </div>
    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};

export default class Stats extends SmartView {
  constructor(data) {
    super();

    this._data = data;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  getTemplate() {
    return createStatsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._typeChart = renderTypeChart(typeCtx, this._data);
    this._timeChart = renderTimeChart(timeCtx, this._data);
  }
}
