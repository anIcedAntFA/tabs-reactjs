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
  Partial<{
    defaultValue: TabsContextState['activeValue'];
    value: TabsContextState['activeValue'];
    activeFocusedMode: boolean;
    lazyMount: boolean;
    lazyBehavior: LazyMode;
    onChange: (tab: TabsContextState['activeValue']) => void;
  }>
>;

export type TabListProps = ComponentPropsWithoutRef<'div'>;

export type TabTriggerProps = ComponentPropsWithoutRef<'button'> & {
  value: TabsContextState['activeValue'];
};

export type TabPanelGroupProps = ComponentPropsWithoutRef<'div'>;

export type TabPanelProps = ComponentPropsWithoutRef<'div'> & {
  value: TabsContextState['activeValue'];
};
