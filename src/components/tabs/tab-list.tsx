import cx from 'clsx';

import { Direction, TabListProps } from './tabs.type';

import { ElementRef, KeyboardEvent, KeyboardEventHandler, useRef } from 'react';
import { useTabsContext } from './tabs.context';
import './tabs.style.css';
import { DirectionMapValue, Directions } from './tabs.config';

function TabList({ className, children, ...passProps }: TabListProps) {
  const tabListRef = useRef<ElementRef<'div'>>(null);

  //* ref store all available tab elements
  const tabsRef = useRef<ElementRef<'button'>[]>([]);

  const { focusedValue } = useTabsContext();

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
      if (focusedIndex === -1) return focusTab(0);

      const adjacentIndex =
        (tabsRef.current.length + focusedIndex + DirectionMapValue[direction]) %
        tabsRef.current.length;

      focusTab(adjacentIndex);
    };

    const keyMap: Record<string, KeyboardEventHandler> = {
      ArrowRight: () => focusAdjacentTab(Directions.RIGHT),
      ArrowLeft: () => focusAdjacentTab(Directions.LEFT),
      Home: () => focusTab(0),
      End: () => focusTab(tabsRef.current.length - 1),
      Escape: () => queryTab('[role="tab"]:focus')?.blur(),
    };

    const keyAction = keyMap[event.key];

    if (keyAction) {
      event.preventDefault();
      keyAction(event);
    }
  };

  return (
    <div
      ref={tabListRef}
      role='tablist'
      aria-orientation='horizontal'
      className={cx('tabs-list', className)}
      onKeyDown={handleKeyDown}
      {...passProps}
    >
      {children}
    </div>
  );
}

export default TabList;
