import {
  ComponentPropsWithoutRef,
  Dispatch,
  ElementRef,
  RefObject,
  SetStateAction,
} from 'react';
import { Directions, Orientations } from './tabs.config';

export type OverrideProps<T, TOverridden> = Omit<T, keyof TOverridden> &
  TOverridden;

export type BaseValue = number | string;

export type LazyMode = 'unmount' | 'keepMounted';

export type OrientationKey = keyof typeof Orientations;

export type Orientation = (typeof Orientations)[OrientationKey];

export type DirectionKey = keyof typeof Directions;

export type Direction = (typeof Directions)[DirectionKey];

export type TabsContextState = {
  id: string;
  orientation: Orientation;
  rootRef: RefObject<ElementRef<'div'>>;
  activeValue: BaseValue;
  focusedValue: BaseValue;
  activeFocusedMode: boolean;
  lazyMount: boolean;
  lazyBehavior: LazyMode;
  onChangeTab: (newIndex: BaseValue) => void;
  setFocusedValue: Dispatch<SetStateAction<BaseValue>>;
};

export type LazyControl = Partial<{
  enabled: boolean;
  isActive: boolean;
  wasActive: boolean;
  mode: LazyMode;
}>;

export type TabsProps = OverrideProps<
  ComponentPropsWithoutRef<'div'>,
  {
    value: BaseValue;
    onChange: (tab: BaseValue) => void;
  }
> &
  Partial<{
    orientation: Orientation;
    activeFocusedMode: boolean;
    lazyMount: boolean;
    lazyBehavior: LazyMode;
  }>;

export type TabListProps = ComponentPropsWithoutRef<'div'>;

export type TabTriggerProps = ComponentPropsWithoutRef<'button'> & {
  value: BaseValue;
};

export type TabPanelGroupProps = ComponentPropsWithoutRef<'div'>;

export type TabPanelProps = ComponentPropsWithoutRef<'div'> & {
  value: BaseValue;
};
