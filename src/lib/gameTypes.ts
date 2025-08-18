export interface Vector2D {
  x: number;
  y: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface CarSpecs {
  id: string;
  name: string;
  maxSpeed: number;
  acceleration: number;
  handling: number;
  braking: number;
  weight: number;
  topSpeed: number;
  enginePower: number;
  grip: number;
  color: string;
  model: string;
}

export interface CarState {
  position: Vector2D;
  velocity: Vector2D;
  rotation: number;
  speed: number;
  acceleration: number;
  isAccelerating: boolean;
  isBraking: boolean;
  isTurningLeft: boolean;
  isTurningRight: boolean;
  gear: number;
  rpm: number;
  damage: number;
  fuel: number;
}

export interface TrackPoint {
  x: number;
  y: number;
  width: number;
  banking: number;
  surface: SurfaceType;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  length: number;
  difficulty: number;
  laps: number;
  points: TrackPoint[];
  startPosition: Vector2D;
  startRotation: number;
  checkpoints: Vector2D[];
  environment: Environment;
  weather: WeatherType;
  timeOfDay: TimeOfDay;
}

export interface Environment {
  type: EnvironmentType;
  obstacles: Obstacle[];
  decorations: Decoration[];
  lighting: LightingConfig;
}

export interface Obstacle {
  id: string;
  position: Vector2D;
  size: Vector2D;
  type: ObstacleType;
  damage: number;
}

export interface Decoration {
  id: string;
  position: Vector2D;
  type: DecorationType;
  scale: number;
  rotation: number;
}

export interface LightingConfig {
  ambient: number;
  directional: Vector3D;
  shadows: boolean;
  fog: FogConfig;
}

export interface FogConfig {
  enabled: boolean;
  density: number;
  color: string;
  near: number;
  far: number;
}

export interface RaceState {
  isActive: boolean;
  isPaused: boolean;
  isFinished: boolean;
  currentLap: number;
  totalLaps: number;
  raceTime: number;
  lapTimes: number[];
  bestLapTime: number;
  position: number;
  totalRacers: number;
  checkpointsPassed: number;
  totalCheckpoints: number;
}

export interface GameState {
  currentTrack: Track | null;
  playerCar: CarState;
  playerSpecs: CarSpecs;
  aiCars: AICarState[];
  raceState: RaceState;
  gameMode: GameMode;
  settings: GameSettings;
  achievements: Achievement[];
  statistics: GameStatistics;
}

export interface AICarState extends CarState {
  id: string;
  specs: CarSpecs;
  difficulty: AIDifficulty;
  targetPoint: Vector2D;
  pathIndex: number;
  aggressiveness: number;
  skill: number;
}

export interface GameSettings {
  difficulty: Difficulty;
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;
  musicVolume: number;
  graphicsQuality: GraphicsQuality;
  controlScheme: ControlScheme;
  keyBindings: KeyBindings;
  showMinimap: boolean;
  showHUD: boolean;
  cameraMode: CameraMode;
}

export interface KeyBindings {
  accelerate: string[];
  brake: string[];
  turnLeft: string[];
  turnRight: string[];
  pause: string[];
  reset: string[];
  changeCamera: string[];
  horn: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  type: AchievementType;
}

export interface GameStatistics {
  totalRaces: number;
  totalWins: number;
  totalDistance: number;
  totalTime: number;
  bestLapTimes: Record<string, number>;
  favoriteTrack: string;
  favoriteCar: string;
  averagePosition: number;
  crashCount: number;
  perfectLaps: number;
}

export interface InputState {
  accelerate: boolean;
  brake: boolean;
  turnLeft: boolean;
  turnRight: boolean;
  pause: boolean;
  reset: boolean;
  horn: boolean;
  mousePosition: Vector2D;
  touchPosition: Vector2D | null;
}

export interface PhysicsConfig {
  gravity: number;
  friction: number;
  airResistance: number;
  maxSteeringAngle: number;
  wheelBase: number;
  centerOfMass: Vector2D;
  downforce: number;
  suspensionStiffness: number;
}

export interface CollisionResult {
  hasCollision: boolean;
  point: Vector2D;
  normal: Vector2D;
  penetration: number;
  type: CollisionType;
  damage: number;
}

export interface ParticleEffect {
  id: string;
  position: Vector2D;
  velocity: Vector2D;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: ParticleType;
}

export interface SoundEffect {
  id: string;
  type: SoundType;
  volume: number;
  pitch: number;
  loop: boolean;
  position?: Vector2D;
}

export interface CameraState {
  position: Vector2D;
  target: Vector2D;
  zoom: number;
  rotation: number;
  mode: CameraMode;
  shake: number;
  smoothing: number;
}

export interface RaceResult {
  position: number;
  totalTime: number;
  bestLapTime: number;
  averageLapTime: number;
  lapTimes: number[];
  topSpeed: number;
  averageSpeed: number;
  crashes: number;
  perfectLaps: number;
  points: number;
  newAchievements: Achievement[];
}

// Enums
export enum SurfaceType {
  ASPHALT = 'asphalt',
  CONCRETE = 'concrete',
  DIRT = 'dirt',
  GRASS = 'grass',
  GRAVEL = 'gravel',
  ICE = 'ice',
  SAND = 'sand',
  WET = 'wet'
}

export enum EnvironmentType {
  CITY = 'city',
  DESERT = 'desert',
  FOREST = 'forest',
  MOUNTAIN = 'mountain',
  SPEEDWAY = 'speedway',
  STREET = 'street',
  CIRCUIT = 'circuit'
}

export enum WeatherType {
  CLEAR = 'clear',
  CLOUDY = 'cloudy',
  RAIN = 'rain',
  STORM = 'storm',
  FOG = 'fog',
  SNOW = 'snow'
}

export enum TimeOfDay {
  DAWN = 'dawn',
  MORNING = 'morning',
  NOON = 'noon',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  NIGHT = 'night'
}

export enum ObstacleType {
  BARRIER = 'barrier',
  CONE = 'cone',
  TIRE = 'tire',
  WALL = 'wall',
  TREE = 'tree',
  ROCK = 'rock',
  BUILDING = 'building'
}

export enum DecorationType {
  TREE = 'tree',
  BUILDING = 'building',
  SIGN = 'sign',
  LIGHT = 'light',
  CROWD = 'crowd',
  FLAG = 'flag',
  BANNER = 'banner'
}

export enum GameMode {
  SINGLE_RACE = 'single_race',
  TIME_TRIAL = 'time_trial',
  CHAMPIONSHIP = 'championship',
  PRACTICE = 'practice',
  MULTIPLAYER = 'multiplayer'
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

export enum AIDifficulty {
  NOVICE = 'novice',
  AMATEUR = 'amateur',
  PROFESSIONAL = 'professional',
  EXPERT = 'expert',
  LEGENDARY = 'legendary'
}

export enum GraphicsQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  ULTRA = 'ultra'
}

export enum ControlScheme {
  KEYBOARD = 'keyboard',
  GAMEPAD = 'gamepad',
  TOUCH = 'touch',
  CUSTOM = 'custom'
}

export enum CameraMode {
  FOLLOW = 'follow',
  CHASE = 'chase',
  COCKPIT = 'cockpit',
  OVERHEAD = 'overhead',
  CINEMATIC = 'cinematic'
}

export enum AchievementType {
  RACE_WIN = 'race_win',
  LAP_TIME = 'lap_time',
  SPEED = 'speed',
  DISTANCE = 'distance',
  SKILL = 'skill',
  COLLECTION = 'collection',
  SPECIAL = 'special'
}

export enum CollisionType {
  WALL = 'wall',
  OBSTACLE = 'obstacle',
  CAR = 'car',
  BOUNDARY = 'boundary',
  CHECKPOINT = 'checkpoint'
}

export enum ParticleType {
  EXHAUST = 'exhaust',
  DUST = 'dust',
  SMOKE = 'smoke',
  SPARKS = 'sparks',
  DEBRIS = 'debris',
  RAIN = 'rain',
  SNOW = 'snow'
}

export enum SoundType {
  ENGINE = 'engine',
  BRAKE = 'brake',
  TIRE_SCREECH = 'tire_screech',
  CRASH = 'crash',
  HORN = 'horn',
  WIND = 'wind',
  MUSIC = 'music',
  UI = 'ui'
}

// Type guards
export const isValidVector2D = (obj: any): obj is Vector2D => {
  return obj && typeof obj.x === 'number' && typeof obj.y === 'number';
};

export const isValidCarState = (obj: any): obj is CarState => {
  return obj && 
    isValidVector2D(obj.position) && 
    isValidVector2D(obj.velocity) && 
    typeof obj.rotation === 'number' &&
    typeof obj.speed === 'number';
};

export const isValidTrack = (obj: any): obj is Track => {
  return obj && 
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.points) &&
    isValidVector2D(obj.startPosition);
};

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type GameEvent = {
  type: string;
  timestamp: number;
  data: any;
};

export type UpdateFunction = (deltaTime: number) => void;
export type RenderFunction = (context: CanvasRenderingContext2D) => void;
export type EventHandler<T = any> = (event: T) => void;