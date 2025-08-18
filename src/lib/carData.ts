export interface CarSpecs {
  id: string;
  name: string;
  manufacturer: string;
  category: 'sports' | 'supercar' | 'formula' | 'muscle';
  performance: {
    topSpeed: number; // km/h
    acceleration: number; // 0-100 km/h in seconds
    handling: number; // 1-10 scale
    braking: number; // 1-10 scale
    weight: number; // kg
    power: number; // horsepower
  };
  physics: {
    maxSpeed: number; // pixels per frame
    accelerationRate: number;
    decelerationRate: number;
    turnSpeed: number;
    driftFactor: number;
    gripLevel: number;
  };
  visual: {
    color: string;
    secondaryColor: string;
    length: number; // pixels
    width: number; // pixels
    sprite: string;
  };
  audio: {
    engineSound: string;
    exhaustNote: 'deep' | 'high' | 'raspy' | 'smooth';
  };
  unlockRequirement?: {
    type: 'wins' | 'time' | 'points';
    value: number;
  };
}

export const carDatabase: CarSpecs[] = [
  {
    id: 'civic-type-r',
    name: 'Civic Type R',
    manufacturer: 'Honda',
    category: 'sports',
    performance: {
      topSpeed: 272,
      acceleration: 5.8,
      handling: 8,
      braking: 8,
      weight: 1380,
      power: 320
    },
    physics: {
      maxSpeed: 12,
      accelerationRate: 0.3,
      decelerationRate: 0.4,
      turnSpeed: 0.08,
      driftFactor: 0.15,
      gripLevel: 0.85
    },
    visual: {
      color: '#FF0000',
      secondaryColor: '#000000',
      length: 60,
      width: 28,
      sprite: 'civic-type-r'
    },
    audio: {
      engineSound: 'vtec-turbo',
      exhaustNote: 'high'
    }
  },
  {
    id: 'mustang-gt',
    name: 'Mustang GT',
    manufacturer: 'Ford',
    category: 'muscle',
    performance: {
      topSpeed: 250,
      acceleration: 4.3,
      handling: 6,
      braking: 7,
      weight: 1760,
      power: 460
    },
    physics: {
      maxSpeed: 14,
      accelerationRate: 0.4,
      decelerationRate: 0.3,
      turnSpeed: 0.06,
      driftFactor: 0.25,
      gripLevel: 0.75
    },
    visual: {
      color: '#1E3A8A',
      secondaryColor: '#FFFFFF',
      length: 65,
      width: 32,
      sprite: 'mustang-gt'
    },
    audio: {
      engineSound: 'v8-naturally-aspirated',
      exhaustNote: 'deep'
    }
  },
  {
    id: 'porsche-911',
    name: '911 Turbo S',
    manufacturer: 'Porsche',
    category: 'supercar',
    performance: {
      topSpeed: 330,
      acceleration: 2.7,
      handling: 9,
      braking: 9,
      weight: 1640,
      power: 650
    },
    physics: {
      maxSpeed: 16,
      accelerationRate: 0.5,
      decelerationRate: 0.5,
      turnSpeed: 0.09,
      driftFactor: 0.12,
      gripLevel: 0.92
    },
    visual: {
      color: '#FFD700',
      secondaryColor: '#000000',
      length: 58,
      width: 30,
      sprite: 'porsche-911'
    },
    audio: {
      engineSound: 'flat-six-turbo',
      exhaustNote: 'smooth'
    },
    unlockRequirement: {
      type: 'wins',
      value: 3
    }
  },
  {
    id: 'mclaren-720s',
    name: '720S',
    manufacturer: 'McLaren',
    category: 'supercar',
    performance: {
      topSpeed: 341,
      acceleration: 2.9,
      handling: 9,
      braking: 10,
      weight: 1419,
      power: 720
    },
    physics: {
      maxSpeed: 17,
      accelerationRate: 0.6,
      decelerationRate: 0.6,
      turnSpeed: 0.10,
      driftFactor: 0.10,
      gripLevel: 0.95
    },
    visual: {
      color: '#FF6B35',
      secondaryColor: '#2C2C2C',
      length: 62,
      width: 31,
      sprite: 'mclaren-720s'
    },
    audio: {
      engineSound: 'v8-twin-turbo',
      exhaustNote: 'high'
    },
    unlockRequirement: {
      type: 'wins',
      value: 5
    }
  },
  {
    id: 'formula-x1',
    name: 'Formula X1',
    manufacturer: 'Racing Dynamics',
    category: 'formula',
    performance: {
      topSpeed: 380,
      acceleration: 2.1,
      handling: 10,
      braking: 10,
      weight: 740,
      power: 900
    },
    physics: {
      maxSpeed: 20,
      accelerationRate: 0.8,
      decelerationRate: 0.8,
      turnSpeed: 0.12,
      driftFactor: 0.05,
      gripLevel: 0.98
    },
    visual: {
      color: '#000000',
      secondaryColor: '#FF0000',
      length: 70,
      width: 25,
      sprite: 'formula-x1'
    },
    audio: {
      engineSound: 'v10-high-rev',
      exhaustNote: 'raspy'
    },
    unlockRequirement: {
      type: 'wins',
      value: 10
    }
  },
  {
    id: 'bmw-m3',
    name: 'M3 Competition',
    manufacturer: 'BMW',
    category: 'sports',
    performance: {
      topSpeed: 290,
      acceleration: 3.9,
      handling: 8,
      braking: 8,
      weight: 1730,
      power: 510
    },
    physics: {
      maxSpeed: 13,
      accelerationRate: 0.4,
      decelerationRate: 0.4,
      turnSpeed: 0.08,
      driftFactor: 0.18,
      gripLevel: 0.88
    },
    visual: {
      color: '#FFFFFF',
      secondaryColor: '#1E40AF',
      length: 62,
      width: 30,
      sprite: 'bmw-m3'
    },
    audio: {
      engineSound: 'inline-six-turbo',
      exhaustNote: 'smooth'
    },
    unlockRequirement: {
      type: 'wins',
      value: 2
    }
  },
  {
    id: 'lamborghini-huracan',
    name: 'Huracán EVO',
    manufacturer: 'Lamborghini',
    category: 'supercar',
    performance: {
      topSpeed: 325,
      acceleration: 3.2,
      handling: 9,
      braking: 9,
      weight: 1422,
      power: 640
    },
    physics: {
      maxSpeed: 16,
      accelerationRate: 0.55,
      decelerationRate: 0.55,
      turnSpeed: 0.09,
      driftFactor: 0.13,
      gripLevel: 0.93
    },
    visual: {
      color: '#00FF00',
      secondaryColor: '#000000',
      length: 64,
      width: 32,
      sprite: 'lamborghini-huracan'
    },
    audio: {
      engineSound: 'v10-naturally-aspirated',
      exhaustNote: 'raspy'
    },
    unlockRequirement: {
      type: 'wins',
      value: 7
    }
  },
  {
    id: 'dodge-challenger',
    name: 'Challenger Hellcat',
    manufacturer: 'Dodge',
    category: 'muscle',
    performance: {
      topSpeed: 320,
      acceleration: 3.4,
      handling: 5,
      braking: 6,
      weight: 2202,
      power: 717
    },
    physics: {
      maxSpeed: 15,
      accelerationRate: 0.6,
      decelerationRate: 0.25,
      turnSpeed: 0.05,
      driftFactor: 0.35,
      gripLevel: 0.65
    },
    visual: {
      color: '#8B0000',
      secondaryColor: '#FFD700',
      length: 68,
      width: 34,
      sprite: 'dodge-challenger'
    },
    audio: {
      engineSound: 'v8-supercharged',
      exhaustNote: 'deep'
    },
    unlockRequirement: {
      type: 'wins',
      value: 4
    }
  }
];

export const getCarById = (id: string): CarSpecs | undefined => {
  return carDatabase.find(car => car.id === id);
};

export const getCarsByCategory = (category: CarSpecs['category']): CarSpecs[] => {
  return carDatabase.filter(car => car.category === category);
};

export const getUnlockedCars = (playerStats: { wins: number; totalTime: number; points: number }): CarSpecs[] => {
  return carDatabase.filter(car => {
    if (!car.unlockRequirement) return true;
    
    switch (car.unlockRequirement.type) {
      case 'wins':
        return playerStats.wins >= car.unlockRequirement.value;
      case 'time':
        return playerStats.totalTime >= car.unlockRequirement.value;
      case 'points':
        return playerStats.points >= car.unlockRequirement.value;
      default:
        return true;
    }
  });
};

export const getCarPerformanceRating = (car: CarSpecs): number => {
  const speedRating = (car.performance.topSpeed / 400) * 100;
  const accelRating = (6 - car.performance.acceleration) * 20;
  const handlingRating = car.performance.handling * 10;
  const brakingRating = car.performance.braking * 10;
  
  return Math.round((speedRating + accelRating + handlingRating + brakingRating) / 4);
};

export const defaultCar = carDatabase[0]; // Honda Civic Type R as starter car