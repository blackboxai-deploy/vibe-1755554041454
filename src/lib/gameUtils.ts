export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export const normalizeAngle = (angle: number): number => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const radiansToDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

export const distance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
};

export const formatSpeed = (speed: number): string => {
  return Math.round(speed).toString();
};

export const calculateLapProgress = (x: number, y: number, trackPoints: Array<{x: number, y: number}>): number => {
  if (trackPoints.length === 0) return 0;
  
  let closestDistance = Infinity;
  let closestIndex = 0;
  
  for (let i = 0; i < trackPoints.length; i++) {
    const dist = distance(x, y, trackPoints[i].x, trackPoints[i].y);
    if (dist < closestDistance) {
      closestDistance = dist;
      closestIndex = i;
    }
  }
  
  return closestIndex / trackPoints.length;
};

export const isPointInTrack = (x: number, y: number, trackBounds: Array<{x: number, y: number}>): boolean => {
  let inside = false;
  for (let i = 0, j = trackBounds.length - 1; i < trackBounds.length; j = i++) {
    if (((trackBounds[i].y > y) !== (trackBounds[j].y > y)) &&
        (x < (trackBounds[j].x - trackBounds[i].x) * (y - trackBounds[i].y) / (trackBounds[j].y - trackBounds[i].y) + trackBounds[i].x)) {
      inside = !inside;
    }
  }
  return inside;
};

export const calculateGripFactor = (surfaceType: string, weather: string): number => {
  const baseFriction = {
    asphalt: 1.0,
    dirt: 0.7,
    grass: 0.4,
    sand: 0.3
  };
  
  const weatherMultiplier = {
    clear: 1.0,
    rain: 0.6,
    fog: 0.9,
    snow: 0.3
  };
  
  return (baseFriction[surfaceType as keyof typeof baseFriction] || 1.0) * 
         (weatherMultiplier[weather as keyof typeof weatherMultiplier] || 1.0);
};

export const generateTrackPoints = (centerX: number, centerY: number, radius: number, segments: number): Array<{x: number, y: number}> => {
  const points = [];
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    const variation = Math.sin(angle * 3) * 0.2 + Math.cos(angle * 5) * 0.1;
    const currentRadius = radius * (1 + variation);
    points.push({
      x: centerX + Math.cos(angle) * currentRadius,
      y: centerY + Math.sin(angle) * currentRadius
    });
  }
  return points;
};

export const calculateCarPerformance = (carType: string, speed: number): {acceleration: number, handling: number, topSpeed: number} => {
  const carStats = {
    sports: { acceleration: 0.8, handling: 0.9, topSpeed: 200 },
    muscle: { acceleration: 1.0, handling: 0.6, topSpeed: 180 },
    formula: { acceleration: 0.9, handling: 1.0, topSpeed: 220 },
    rally: { acceleration: 0.7, handling: 0.8, topSpeed: 160 }
  };
  
  return carStats[carType as keyof typeof carStats] || carStats.sports;
};

export const detectCollision = (car1: {x: number, y: number, width: number, height: number}, 
                               car2: {x: number, y: number, width: number, height: number}): boolean => {
  return car1.x < car2.x + car2.width &&
         car1.x + car1.width > car2.x &&
         car1.y < car2.y + car2.height &&
         car1.y + car1.height > car2.y;
};

export const calculateAIBehavior = (aiCar: any, playerCar: any, trackData: any): {steering: number, throttle: number} => {
  const targetPoint = trackData.centerLine[aiCar.targetWaypoint];
  if (!targetPoint) return { steering: 0, throttle: 0.5 };
  
  const angleToTarget = Math.atan2(targetPoint.y - aiCar.y, targetPoint.x - aiCar.x);
  const angleDiff = normalizeAngle(angleToTarget - aiCar.rotation);
  
  const steering = clamp(angleDiff * 2, -1, 1);
  const distanceToTarget = distance(aiCar.x, aiCar.y, targetPoint.x, targetPoint.y);
  
  let throttle = 0.8;
  if (Math.abs(angleDiff) > Math.PI / 4) throttle = 0.4;
  if (distanceToTarget < 50) {
    aiCar.targetWaypoint = (aiCar.targetWaypoint + 1) % trackData.centerLine.length;
  }
  
  return { steering, throttle };
};

export const updateParticles = (particles: Array<any>, deltaTime: number): Array<any> => {
  return particles.filter(particle => {
    particle.life -= deltaTime;
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;
    particle.vx *= 0.98;
    particle.vy *= 0.98;
    return particle.life > 0;
  });
};

export const createExhaustParticle = (x: number, y: number, rotation: number): any => {
  const angle = rotation + Math.PI + (Math.random() - 0.5) * 0.5;
  return {
    x,
    y,
    vx: Math.cos(angle) * (20 + Math.random() * 10),
    vy: Math.sin(angle) * (20 + Math.random() * 10),
    life: 1000 + Math.random() * 500,
    size: 2 + Math.random() * 3,
    opacity: 0.6 + Math.random() * 0.4
  };
};

export const calculateEngineSound = (rpm: number, throttle: number): {pitch: number, volume: number} => {
  const basePitch = 0.5 + (rpm / 8000) * 1.5;
  const volume = 0.3 + throttle * 0.7;
  return { pitch: clamp(basePitch, 0.5, 2.0), volume: clamp(volume, 0.1, 1.0) };
};

export const saveGameProgress = (data: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('raceGameProgress', JSON.stringify(data));
  }
};

export const loadGameProgress = (): any => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('raceGameProgress');
    return saved ? JSON.parse(saved) : null;
  }
  return null;
};

export const calculateRacePosition = (cars: Array<any>): Array<any> => {
  return cars.sort((a, b) => {
    if (a.currentLap !== b.currentLap) {
      return b.currentLap - a.currentLap;
    }
    return b.lapProgress - a.lapProgress;
  }).map((car, index) => ({
    ...car,
    position: index + 1
  }));
};