import {getRandomInteger} from '../utils/util.js';
import {generatePhotos, generateDescriptions} from './mock.js';

export const typeUpdate = {
  'Taxi': [
    {
      title: `switch-to-comfort-class`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `long-waiting`,
      price: getRandomInteger(0, 100)
    }
  ],
  'Bus': [
    {
      title: `choose-seats`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `insurance`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `add-luggage`,
      price: getRandomInteger(0, 100)
    }
  ],
  'Train': [
    {
      title: `choose-seats`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `insurance`,
      price: getRandomInteger(0, 100)
    }
  ],
  'Ship': [
    {
      title: `choose-seats`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `switch-to-comfort-class`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `add-luggage`,
      price: getRandomInteger(0, 100)
    }
  ],
  'Transport': [
    {
      title: `switch-to-comfort-class`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `add-luggage`,
      price: getRandomInteger(0, 100)
    }
  ],
  'Drive': [
    {
      title: `Rent a car`,
      price: getRandomInteger(10, 200)
    }
  ],
  'Flight': [
    {
      title: `choose-seats`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `switch-to-comfort-class`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `add-luggage`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `insurance`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `add-meal`,
      price: getRandomInteger(0, 100)
    }
  ],
  'Check-in': [
    {
      title: `choose-room`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `spa-access`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `switch-to-comfort-class`,
      price: getRandomInteger(0, 100)
    }
  ],
  'Sightseeing': [
    {
      title: `travel-by-bus`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `personal-guide`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `food-court`,
      price: getRandomInteger(0, 100)
    }
  ],
  'Restaurant': [
    {
      title: `choose-table`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `parking`,
      price: getRandomInteger(0, 100)
    },
    {
      title: `early-access`,
      price: getRandomInteger(0, 100)
    }
  ]
};

export const pointsUpdate = [
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

export const cityUpdate = {
  'Amsterdam': [
    {
      photos: Array(4).fill().map(generatePhotos),
      description: generateDescriptions()
    }
  ],
  'Chamonix': [
    {
      photos: Array(5).fill().map(generatePhotos),
      description: generateDescriptions()
    }
  ],
  'Geneva': [
    {
      photos: Array(3).fill().map(generatePhotos),
      description: generateDescriptions()
    }
  ],

};
