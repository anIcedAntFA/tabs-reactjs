import cx from 'clsx';

import { Direction, TabListProps } from './tabs.type';

import { ElementRef, KeyboardEvent, KeyboardEventHandler, useRef } from 'react';
import { DirectionMapValue, Directions, Orientations } from './tabs.config';
import { useTabsContext } from './tabs.context';
import './tabs.style.css';

function TabList({ className, children, ...passProps }: TabListProps) {
  const tabListRef = useRef<ElementRef<'div'>>(null);

  //* ref store all available tab elements
  const tabsRef = useRef<ElementRef<'button'>[]>([]);

  const { orientation, focusedValue } = useTabsContext();

  const queryTab = (selector: string) => {
    if (!tabListRef.current) return;

    return tabListRef.current.querySelector<HTMLButtonElement>(selector);
  };

  const focusTab = (index: number) => {
    return tabsRef.current[index].focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const availableTabs =
      tabListRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])'
      );

    tabsRef.current = Array.from(availableTabs ?? []);

    const focusedIndex = tabsRef.current.findIndex(
      (tab) => tab.getAttribute('data-index') === focusedValue.toString()
    );

    const focusAdjacentTab = (direction: Direction) => {
      if (focusedIndex === -1) return;

      //TODO Create a circular list effect.
      //* If calculated index > last index, it wraps around to the start of the array.
      //* If it < first index, it wraps around to the end of the array.
      const adjacentIndex =
        (tabsRef.current.length + focusedIndex + DirectionMapValue[direction]) %
        tabsRef.current.length;

      focusTab(adjacentIndex);
    };

    const isHorizontal = orientation === Orientations.HORIZONTAL;
    const isVertical = orientation === Orientations.VERTICAL;

    const keyMap: Record<string, KeyboardEventHandler> = {
      ArrowRight: () => isHorizontal && focusAdjacentTab(Directions.FORWARD),
      ArrowLeft: () => isHorizontal && focusAdjacentTab(Directions.BACKWARD),
      ArrowDown: () => isVertical && focusAdjacentTab(Directions.FORWARD),
      ArrowUp: () => isVertical && focusAdjacentTab(Directions.BACKWARD),
      Home: () => focusTab(0),
      End: () => focusTab(tabsRef.current.length - 1),
      Escape: () => queryTab('[role="tab"]:focus')?.blur(),
    };

    const keyEvent = event.key;
    const keyAction = keyMap[keyEvent];

    if (keyAction) {
      event.preventDefault();
      keyAction(event);
    }
  };

  return (
    <div
      ref={tabListRef}
      role='tablist'
      aria-orientation={
        orientation === Orientations.VERTICAL ? 'vertical' : 'horizontal'
      }
      className={cx(
        'tabs-list',
        {
          [`tabs-list--${orientation}`]: orientation,
        },
        className
      )}
      onKeyDown={handleKeyDown}
      {...passProps}
    >
      {children}
    </div>
  );
}

export default TabList;
