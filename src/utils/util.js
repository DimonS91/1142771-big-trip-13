export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomElements = (arr) => {
  return arr.filter(() => Math.random() >= 0.5);
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
