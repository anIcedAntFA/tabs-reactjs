import { Direction } from './tabs.type';

export const DEFAULT_ACTIVE_INDEX = 0;

export const Orientations = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export const Directions = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export const DirectionMapValue: {
  [key in Direction]: number;
} = {
  [Directions.LEFT]: -1,
  [Directions.RIGHT]: 1,
} as const;
