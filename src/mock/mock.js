export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const gerRandomElements = (arr) => {
  return arr.filter(() => Math.random() >= 0.5);
};

const generateRandomPoints = () => {
  const poits = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeng`,
    `Restaurant`
  ];

  const randomIndex = getRandomInteger(0, poits.length - 1);
  return poits[randomIndex];
};

const generateRandomCity = () => {
  const city = [
    `Amsterdam`,
    `Chamonix`,
    `Geneva`,
    `Los Angeles`
  ];

  const randomIndex = getRandomInteger(0, city.length - 1);
  return city[randomIndex];
};

const generateOffers = () => {
  const offers = [
    {
      title: `Add luggage`,
      price: 50,
      isChecked: false
    },
    {
      title: `Switch to comfort class`,
      price: 100,
      isChecked: false
    },
    {
      title: `Add meal`,
      price: 150,
      isChecked: false
    },
    {
      title: `Choose seats`,
      price: 110,
      isChecked: false
    },
    {
      title: `Travel by train`,
      price: 80,
      isChecked: false
    }
  ];

  const getRandomOffers = gerRandomElements(offers);
  return getRandomOffers;
};

const generatePhotos = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const generateDescriptions = () => {
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

const generateDate = () => {
  return (
    Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000
  );
};

const generateData = () => {
  const startEvent = generateDate();
  const endEvent = generateDate();
  return {
    point: generateRandomPoints(),
    city: generateRandomCity(),
    offer: generateOffers(),
    startEvent: Math.min(startEvent, endEvent),
    endEvent: Math.max(startEvent, endEvent),
    price: getRandomInteger(5, 100),
    description: generateDescriptions(),
    photos: Array(3).fill().map(generatePhotos)
  };
};
const createData = (count) => {
  return Array(count).fill().map(() => generateData()).sort((current, next) => current.startEvent - next.startEvent);
};

export const data = createData(15);
