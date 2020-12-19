import {getRandomInteger, getRandomElements, generateId} from '../utils/util.js';
import {generateDate} from '../utils/time.js';


const generateRandomPoints = () => {
  const points = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ];

  const randomIndex = getRandomInteger(0, points.length - 1);
  return points[randomIndex];
};

export const createCity = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`
];

const generateRandomCity = () => {
  const randomIndex = getRandomInteger(0, createCity.length - 1);
  return createCity[randomIndex];
};

export const generateOffers = () => {
  const offers = [
    {
      title: `Add luggage`,
      price: 50,
      isChecked: Boolean(getRandomInteger(0, 1))
    },
    {
      title: `Switch to comfort class`,
      price: 100,
      isChecked: Boolean(getRandomInteger(0, 1))
    },
    {
      title: `Add meal`,
      price: 150,
      isChecked: Boolean(getRandomInteger(0, 1))
    },
    {
      title: `Choose seats`,
      price: 110,
      isChecked: Boolean(getRandomInteger(0, 1))
    },
    {
      title: `Travel by train`,
      price: 80,
      isChecked: Boolean(getRandomInteger(0, 1))
    }
  ];

  const getRandomOffers = getRandomElements(offers);
  return getRandomOffers;
};

export const generatePhotos = () => `http://picsum.photos/248/152?r=${Math.random()}`;

export const generateDescriptions = () => {
  const description = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const descriptionSort = description.sort(() => Math.random() - 0.5);
  const result = descriptionSort.slice(0, getRandomInteger(1, 5)).join(``);
  return result;
};

const generateData = () => {
  const startEvent = generateDate();
  const endEvent = generateDate();
  return {
    id: generateId(),
    point: generateRandomPoints(),
    city: generateRandomCity(),
    offer: generateOffers(),
    startEvent: Math.min(startEvent, endEvent),
    endEvent: Math.max(startEvent, endEvent),
    price: getRandomInteger(5, 100),
    description: generateDescriptions(),
    photos: Array(5).fill().map(generatePhotos),
    isFavorite: getRandomInteger(0, 1)
  };
};
const createData = (count) => {
  return Array(count).fill().map(() => generateData()).sort((current, next) => current.startEvent - next.startEvent);
};

export const data = createData(15);
