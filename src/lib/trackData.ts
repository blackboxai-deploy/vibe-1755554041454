export interface TrackPoint {
  x: number;
  y: number;
  z: number;
  width: number;
  banking: number;
  surface: 'asphalt' | 'concrete' | 'dirt' | 'gravel';
  grip: number;
}

export interface TrackSegment {
  points: TrackPoint[];
  type: 'straight' | 'curve' | 'chicane' | 'hairpin';
  speedLimit: number;
  difficulty: number;
}

export interface Checkpoint {
  position: { x: number; y: number };
  angle: number;
  width: number;
}

export interface WeatherCondition {
  type: 'sunny' | 'cloudy' | 'rain' | 'fog' | 'night';
  visibility: number;
  gripModifier: number;
  windSpeed: number;
  windDirection: number;
}

export interface TrackConfiguration {
  id: string;
  name: string;
  description: string;
  length: number;
  width: number;
  laps: number;
  difficulty: 'beginner' | 'intermediate' | 'expert' | 'professional';
  environment: 'city' | 'desert' | 'mountain' | 'speedway' | 'forest';
  segments: TrackSegment[];
  checkpoints: Checkpoint[];
  startPosition: { x: number; y: number; angle: number };
  weather: WeatherCondition[];
  recordTime: number;
  unlocked: boolean;
  preview: string;
}

export const TRACK_CONFIGURATIONS: TrackConfiguration[] = [
  {
    id: 'speedway_oval',
    name: 'Thunder Speedway',
    description: 'High-speed oval track perfect for beginners',
    length: 2.5,
    width: 12,
    laps: 5,
    difficulty: 'beginner',
    environment: 'speedway',
    segments: [
      {
        points: [
          { x: 0, y: 0, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 1.0 },
          { x: 100, y: 0, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 1.0 },
          { x: 200, y: 0, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 1.0 },
          { x: 300, y: 0, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 1.0 }
        ],
        type: 'straight',
        speedLimit: 200,
        difficulty: 1
      },
      {
        points: [
          { x: 300, y: 0, z: 0, width: 12, banking: 15, surface: 'asphalt', grip: 1.0 },
          { x: 350, y: 25, z: 0, width: 12, banking: 15, surface: 'asphalt', grip: 1.0 },
          { x: 375, y: 75, z: 0, width: 12, banking: 15, surface: 'asphalt', grip: 1.0 },
          { x: 375, y: 125, z: 0, width: 12, banking: 15, surface: 'asphalt', grip: 1.0 }
        ],
        type: 'curve',
        speedLimit: 160,
        difficulty: 2
      },
      {
        points: [
          { x: 375, y: 125, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 1.0 },
          { x: 275, y: 125, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 1.0 },
          { x: 175, y: 125, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 1.0 },
          { x: 75, y: 125, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 1.0 }
        ],
        type: 'straight',
        speedLimit: 200,
        difficulty: 1
      },
      {
        points: [
          { x: 75, y: 125, z: 0, width: 12, banking: 15, surface: 'asphalt', grip: 1.0 },
          { x: 25, y: 100, z: 0, width: 12, banking: 15, surface: 'asphalt', grip: 1.0 },
          { x: 0, y: 50, z: 0, width: 12, banking: 15, surface: 'asphalt', grip: 1.0 },
          { x: 0, y: 0, z: 0, width: 12, banking: 15, surface: 'asphalt', grip: 1.0 }
        ],
        type: 'curve',
        speedLimit: 160,
        difficulty: 2
      }
    ],
    checkpoints: [
      { position: { x: 0, y: 0 }, angle: 0, width: 12 },
      { position: { x: 300, y: 0 }, angle: 0, width: 12 },
      { position: { x: 375, y: 125 }, angle: 180, width: 12 },
      { position: { x: 75, y: 125 }, angle: 180, width: 12 }
    ],
    startPosition: { x: 0, y: 6, angle: 0 },
    weather: [
      { type: 'sunny', visibility: 1.0, gripModifier: 1.0, windSpeed: 5, windDirection: 90 },
      { type: 'cloudy', visibility: 0.9, gripModifier: 1.0, windSpeed: 10, windDirection: 180 }
    ],
    recordTime: 95.5,
    unlocked: true,
    preview: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/623e03c0-6b4d-4a14-b8b2-3671f7e24c82.png'
  },
  {
    id: 'city_circuit',
    name: 'Metro Grand Prix',
    description: 'Technical street circuit through downtown',
    length: 3.2,
    width: 10,
    laps: 4,
    difficulty: 'intermediate',
    environment: 'city',
    segments: [
      {
        points: [
          { x: 0, y: 0, z: 0, width: 10, banking: 0, surface: 'asphalt', grip: 0.95 },
          { x: 80, y: 0, z: 0, width: 10, banking: 0, surface: 'asphalt', grip: 0.95 },
          { x: 160, y: 0, z: 0, width: 10, banking: 0, surface: 'asphalt', grip: 0.95 }
        ],
        type: 'straight',
        speedLimit: 180,
        difficulty: 2
      },
      {
        points: [
          { x: 160, y: 0, z: 0, width: 10, banking: 0, surface: 'asphalt', grip: 0.95 },
          { x: 180, y: 20, z: 0, width: 9, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 180, y: 60, z: 0, width: 9, banking: 0, surface: 'asphalt', grip: 0.9 }
        ],
        type: 'chicane',
        speedLimit: 120,
        difficulty: 4
      },
      {
        points: [
          { x: 180, y: 60, z: 0, width: 9, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 160, y: 80, z: 0, width: 9, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 120, y: 100, z: 0, width: 9, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 80, y: 100, z: 0, width: 9, banking: 0, surface: 'asphalt', grip: 0.9 }
        ],
        type: 'curve',
        speedLimit: 140,
        difficulty: 3
      },
      {
        points: [
          { x: 80, y: 100, z: 0, width: 9, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 40, y: 80, z: 0, width: 8, banking: 0, surface: 'asphalt', grip: 0.85 },
          { x: 20, y: 40, z: 0, width: 8, banking: 0, surface: 'asphalt', grip: 0.85 },
          { x: 20, y: 0, z: 0, width: 8, banking: 0, surface: 'asphalt', grip: 0.85 }
        ],
        type: 'hairpin',
        speedLimit: 80,
        difficulty: 5
      },
      {
        points: [
          { x: 20, y: 0, z: 0, width: 8, banking: 0, surface: 'asphalt', grip: 0.85 },
          { x: 10, y: 0, z: 0, width: 10, banking: 0, surface: 'asphalt', grip: 0.95 },
          { x: 0, y: 0, z: 0, width: 10, banking: 0, surface: 'asphalt', grip: 0.95 }
        ],
        type: 'straight',
        speedLimit: 160,
        difficulty: 2
      }
    ],
    checkpoints: [
      { position: { x: 0, y: 0 }, angle: 0, width: 10 },
      { position: { x: 160, y: 0 }, angle: 0, width: 10 },
      { position: { x: 180, y: 60 }, angle: 90, width: 9 },
      { position: { x: 80, y: 100 }, angle: 180, width: 9 },
      { position: { x: 20, y: 0 }, angle: 270, width: 8 }
    ],
    startPosition: { x: 0, y: 5, angle: 0 },
    weather: [
      { type: 'sunny', visibility: 1.0, gripModifier: 1.0, windSpeed: 8, windDirection: 45 },
      { type: 'cloudy', visibility: 0.9, gripModifier: 1.0, windSpeed: 12, windDirection: 90 },
      { type: 'rain', visibility: 0.6, gripModifier: 0.7, windSpeed: 15, windDirection: 180 },
      { type: 'night', visibility: 0.8, gripModifier: 0.95, windSpeed: 5, windDirection: 270 }
    ],
    recordTime: 118.3,
    unlocked: true,
    preview: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/383edf1e-27ef-45ea-9afa-e36bf7f5dd87.png'
  },
  {
    id: 'mountain_pass',
    name: 'Alpine Challenge',
    description: 'Dangerous mountain road with elevation changes',
    length: 4.1,
    width: 8,
    laps: 3,
    difficulty: 'expert',
    environment: 'mountain',
    segments: [
      {
        points: [
          { x: 0, y: 0, z: 0, width: 8, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 60, y: 0, z: 10, width: 8, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 120, y: 20, z: 25, width: 8, banking: 0, surface: 'asphalt', grip: 0.9 }
        ],
        type: 'straight',
        speedLimit: 160,
        difficulty: 3
      },
      {
        points: [
          { x: 120, y: 20, z: 25, width: 8, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 140, y: 50, z: 35, width: 7, banking: -10, surface: 'asphalt', grip: 0.85 },
          { x: 140, y: 90, z: 45, width: 7, banking: -10, surface: 'asphalt', grip: 0.85 },
          { x: 120, y: 120, z: 50, width: 7, banking: -10, surface: 'asphalt', grip: 0.85 }
        ],
        type: 'curve',
        speedLimit: 100,
        difficulty: 6
      },
      {
        points: [
          { x: 120, y: 120, z: 50, width: 7, banking: -10, surface: 'asphalt', grip: 0.85 },
          { x: 100, y: 140, z: 55, width: 6, banking: -15, surface: 'asphalt', grip: 0.8 },
          { x: 60, y: 150, z: 60, width: 6, banking: -15, surface: 'asphalt', grip: 0.8 },
          { x: 20, y: 140, z: 55, width: 6, banking: -15, surface: 'asphalt', grip: 0.8 }
        ],
        type: 'hairpin',
        speedLimit: 60,
        difficulty: 8
      },
      {
        points: [
          { x: 20, y: 140, z: 55, width: 6, banking: -15, surface: 'asphalt', grip: 0.8 },
          { x: 0, y: 120, z: 45, width: 7, banking: -5, surface: 'asphalt', grip: 0.85 },
          { x: -10, y: 80, z: 30, width: 7, banking: -5, surface: 'asphalt', grip: 0.85 },
          { x: 0, y: 40, z: 15, width: 7, banking: -5, surface: 'asphalt', grip: 0.85 }
        ],
        type: 'curve',
        speedLimit: 120,
        difficulty: 5
      },
      {
        points: [
          { x: 0, y: 40, z: 15, width: 7, banking: -5, surface: 'asphalt', grip: 0.85 },
          { x: 0, y: 20, z: 8, width: 8, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 0, y: 0, z: 0, width: 8, banking: 0, surface: 'asphalt', grip: 0.9 }
        ],
        type: 'straight',
        speedLimit: 140,
        difficulty: 3
      }
    ],
    checkpoints: [
      { position: { x: 0, y: 0 }, angle: 0, width: 8 },
      { position: { x: 120, y: 20 }, angle: 30, width: 8 },
      { position: { x: 120, y: 120 }, angle: 120, width: 7 },
      { position: { x: 20, y: 140 }, angle: 180, width: 6 },
      { position: { x: 0, y: 40 }, angle: 270, width: 7 }
    ],
    startPosition: { x: 0, y: 4, angle: 0 },
    weather: [
      { type: 'sunny', visibility: 1.0, gripModifier: 1.0, windSpeed: 15, windDirection: 270 },
      { type: 'cloudy', visibility: 0.8, gripModifier: 0.95, windSpeed: 20, windDirection: 180 },
      { type: 'fog', visibility: 0.4, gripModifier: 0.9, windSpeed: 25, windDirection: 90 }
    ],
    recordTime: 156.8,
    unlocked: false,
    preview: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fa50f4c9-3f7d-434b-aed5-e1efe5a383ec.png'
  },
  {
    id: 'desert_storm',
    name: 'Sahara Circuit',
    description: 'High-speed desert track with sand hazards',
    length: 3.8,
    width: 14,
    laps: 4,
    difficulty: 'intermediate',
    environment: 'desert',
    segments: [
      {
        points: [
          { x: 0, y: 0, z: 0, width: 14, banking: 0, surface: 'asphalt', grip: 0.95 },
          { x: 100, y: 0, z: 0, width: 14, banking: 0, surface: 'asphalt', grip: 0.95 },
          { x: 200, y: 0, z: 0, width: 14, banking: 0, surface: 'asphalt', grip: 0.95 },
          { x: 300, y: 0, z: 0, width: 14, banking: 0, surface: 'asphalt', grip: 0.95 }
        ],
        type: 'straight',
        speedLimit: 220,
        difficulty: 2
      },
      {
        points: [
          { x: 300, y: 0, z: 0, width: 14, banking: 5, surface: 'asphalt', grip: 0.9 },
          { x: 330, y: 30, z: 0, width: 12, banking: 5, surface: 'asphalt', grip: 0.9 },
          { x: 340, y: 70, z: 0, width: 12, banking: 5, surface: 'asphalt', grip: 0.9 },
          { x: 330, y: 110, z: 0, width: 12, banking: 5, surface: 'asphalt', grip: 0.9 }
        ],
        type: 'curve',
        speedLimit: 180,
        difficulty: 3
      },
      {
        points: [
          { x: 330, y: 110, z: 0, width: 12, banking: 5, surface: 'asphalt', grip: 0.9 },
          { x: 310, y: 130, z: 0, width: 10, banking: 0, surface: 'concrete', grip: 0.85 },
          { x: 270, y: 140, z: 0, width: 10, banking: 0, surface: 'concrete', grip: 0.85 },
          { x: 230, y: 130, z: 0, width: 10, banking: 0, surface: 'concrete', grip: 0.85 }
        ],
        type: 'chicane',
        speedLimit: 140,
        difficulty: 4
      },
      {
        points: [
          { x: 230, y: 130, z: 0, width: 10, banking: 0, surface: 'concrete', grip: 0.85 },
          { x: 180, y: 120, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 120, y: 100, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 80, y: 70, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 0.9 }
        ],
        type: 'curve',
        speedLimit: 160,
        difficulty: 3
      },
      {
        points: [
          { x: 80, y: 70, z: 0, width: 12, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 50, y: 40, z: 0, width: 14, banking: 0, surface: 'asphalt', grip: 0.95 },
          { x: 25, y: 20, z: 0, width: 14, banking: 0, surface: 'asphalt', grip: 0.95 },
          { x: 0, y: 0, z: 0, width: 14, banking: 0, surface: 'asphalt', grip: 0.95 }
        ],
        type: 'curve',
        speedLimit: 180,
        difficulty: 2
      }
    ],
    checkpoints: [
      { position: { x: 0, y: 0 }, angle: 0, width: 14 },
      { position: { x: 300, y: 0 }, angle: 0, width: 14 },
      { position: { x: 330, y: 110 }, angle: 90, width: 12 },
      { position: { x: 230, y: 130 }, angle: 180, width: 10 },
      { position: { x: 80, y: 70 }, angle: 225, width: 12 }
    ],
    startPosition: { x: 0, y: 7, angle: 0 },
    weather: [
      { type: 'sunny', visibility: 0.9, gripModifier: 0.95, windSpeed: 20, windDirection: 45 },
      { type: 'cloudy', visibility: 0.95, gripModifier: 1.0, windSpeed: 10, windDirection: 90 }
    ],
    recordTime: 132.1,
    unlocked: false,
    preview: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ffb37c9d-71dc-463a-9545-0fec61847d89.png'
  },
  {
    id: 'forest_rally',
    name: 'Woodland Sprint',
    description: 'Narrow forest track with mixed surfaces',
    length: 2.9,
    width: 6,
    laps: 6,
    difficulty: 'professional',
    environment: 'forest',
    segments: [
      {
        points: [
          { x: 0, y: 0, z: 0, width: 6, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 40, y: 0, z: 0, width: 6, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 80, y: 10, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 }
        ],
        type: 'straight',
        speedLimit: 140,
        difficulty: 4
      },
      {
        points: [
          { x: 80, y: 10, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 },
          { x: 100, y: 30, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 },
          { x: 110, y: 60, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 },
          { x: 100, y: 90, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 }
        ],
        type: 'curve',
        speedLimit: 80,
        difficulty: 7
      },
      {
        points: [
          { x: 100, y: 90, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 },
          { x: 80, y: 100, z: 0, width: 4, banking: 0, surface: 'dirt', grip: 0.6 },
          { x: 50, y: 105, z: 0, width: 4, banking: 0, surface: 'dirt', grip: 0.6 },
          { x: 20, y: 100, z: 0, width: 4, banking: 0, surface: 'dirt', grip: 0.6 }
        ],
        type: 'chicane',
        speedLimit: 60,
        difficulty: 8
      },
      {
        points: [
          { x: 20, y: 100, z: 0, width: 4, banking: 0, surface: 'dirt', grip: 0.6 },
          { x: 10, y: 80, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 },
          { x: 5, y: 50, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 },
          { x: 10, y: 20, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 }
        ],
        type: 'curve',
        speedLimit: 90,
        difficulty: 6
      },
      {
        points: [
          { x: 10, y: 20, z: 0, width: 5, banking: 0, surface: 'gravel', grip: 0.7 },
          { x: 5, y: 10, z: 0, width: 6, banking: 0, surface: 'asphalt', grip: 0.9 },
          { x: 0, y: 0, z: 0, width: 6, banking: 0, surface: 'asphalt', grip: 0.9 }
        ],
        type: 'straight',
        speedLimit: 120,
        difficulty: 3
      }
    ],
    checkpoints: [
      { position: { x: 0, y: 0 }, angle: 0, width: 6 },
      { position: { x: 80, y: 10 }, angle: 15, width: 5 },
      { position: { x: 100, y: 90 }, angle: 90, width: 5 },
      { position: { x: 20, y: 100 }, angle: 180, width: 4 },
      { position: { x: 10, y: 20 }, angle: 270, width: 5 }
    ],
    startPosition: { x: 0, y: 3, angle: 0 },
    weather: [
      { type: 'cloudy', visibility: 0.8, gripModifier: 0.9, windSpeed: 12, windDirection: 180 },
      { type: 'rain', visibility: 0.5, gripModifier: 0.6, windSpeed: 18, windDirection: 225 },
      { type: 'fog', visibility: 0.3, gripModifier: 0.8, windSpeed: 8, windDirection: 90 }
    ],
    recordTime: 98.7,
    unlocked: false,
    preview: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/55625722-cc82-4e1d-a1f4-d894cc27172a.png'
  }
];

export const getTrackById = (id: string): TrackConfiguration | undefined => {
  return TRACK_CONFIGURATIONS.find(track => track.id === id);
};

export const getUnlockedTracks = (): TrackConfiguration[] => {
  return TRACK_CONFIGURATIONS.filter(track => track.unlocked);
};

export const getTracksByDifficulty = (difficulty: TrackConfiguration['difficulty']): TrackConfiguration[] => {
  return TRACK_CONFIGURATIONS.filter(track => track.difficulty === difficulty);
};

export const getTracksByEnvironment = (environment: TrackConfiguration['environment']): TrackConfiguration[] => {
  return TRACK_CONFIGURATIONS.filter(track => track.environment === environment);
};

export const unlockTrack = (trackId: string): boolean => {
  const track = getTrackById(trackId);
  if (track) {
    track.unlocked = true;
    return true;
  }
  return false;
};

export const updateTrackRecord = (trackId: string, newTime: number): boolean => {
  const track = getTrackById(trackId);
  if (track && newTime < track.recordTime) {
    track.recordTime = newTime;
    return true;
  }
  return false;
};

export const calculateTrackDistance = (track: TrackConfiguration): number => {
  let totalDistance = 0;
  
  track.segments.forEach(segment => {
    for (let i = 0; i < segment.points.length - 1; i++) {
      const p1 = segment.points[i];
      const p2 = segment.points[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dz = p2.z - p1.z;
      totalDistance += Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
  });
  
  return totalDistance;
};

export const getTrackDifficultyColor = (difficulty: TrackConfiguration['difficulty']): string => {
  switch (difficulty) {
    case 'beginner': return '#22c55e';
    case 'intermediate': return '#f59e0b';
    case 'expert': return '#ef4444';
    case 'professional': return '#8b5cf6';
    default: return '#6b7280';
  }
};

export const getEnvironmentTheme = (environment: TrackConfiguration['environment']) => {
  switch (environment) {
    case 'city':
      return {
        backgroundColor: '#1f2937',
        trackColor: '#374151',
        accentColor: '#fbbf24',
        fogColor: '#9ca3af'
      };
    case 'desert':
      return {
        backgroundColor: '#fbbf24',
        trackColor: '#1f2937',
        accentColor: '#f59e0b',
        fogColor: '#fde68a'
      };
    case 'mountain':
      return {
        backgroundColor: '#6b7280',
        trackColor: '#374151',
        accentColor: '#e5e7eb',
        fogColor: '#d1d5db'
      };
    case 'speedway':
      return {
        backgroundColor: '#059669',
        trackColor: '#1f2937',
        accentColor: '#10b981',
        fogColor: '#a7f3d0'
      };
    case 'forest':
      return {
        backgroundColor: '#166534',
        trackColor: '#374151',
        accentColor: '#22c55e',
        fogColor: '#86efac'
      };
    default:
      return {
        backgroundColor: '#1f2937',
        trackColor: '#374151',
        accentColor: '#6b7280',
        fogColor: '#9ca3af'
      };
  }
};