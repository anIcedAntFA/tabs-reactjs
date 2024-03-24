import { ComponentPropsWithoutRef, ElementRef, RefObject } from 'react';

export type OverrideProps<T, TOverridden> = Omit<T, keyof TOverridden> &
  TOverridden;

export type LazyMode = 'unmount' | 'keepMounted';

export type TabsContextState = {
  rootRef: RefObject<ElementRef<'div'>>;
  activeValue: number;
  lazyMount: boolean;
  lazyBehavior: LazyMode;
  onChangeTab: (newIndex: number) => void;
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
