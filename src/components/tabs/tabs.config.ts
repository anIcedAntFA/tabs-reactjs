import { Direction } from './tabs.type';

export const DEFAULT_ACTIVE_INDEX = 0;

export const Orientations = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export const Directions = {
  FORWARD: 'forward',
  BACKWARD: 'backward',
} as const;

export const DirectionMapValue: {
  [key in Direction]: number;
} = {
  [Directions.FORWARD]: 1,
  [Directions.BACKWARD]: -1,
};
