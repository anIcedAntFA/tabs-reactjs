import cx from 'clsx';
import { ElementRef, useId, useRef } from 'react';

import { useTabsContext } from './tabs.context';
import './tabs.style.css';
import { TabTriggerProps } from './tabs.type';

function TabTrigger({
  value: currentValue,
  disabled,
  className,
  children,
  ...passProps
}: TabTriggerProps) {
  const id = useId();

  const tabTriggerRef = useRef<ElementRef<'button'>>(null);

  const { activeValue, onChangeTab } = useTabsContext();

  const isActive = activeValue === currentValue;

  return (
    <button
      id={`tabs-${id}--tab-${currentValue}`}
      ref={tabTriggerRef}
      role='tab'
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      aria-disabled={disabled}
      data-index={currentValue}
      className={cx(
        'tab-trigger',
        {
          ['tab-trigger--active']: isActive,
          ['tab-trigger--disabled']: disabled,
        },
        className
      )}
      onClick={() => onChangeTab(currentValue)}
      {...passProps}
    >
      {children}
    </button>
  );
}

export default TabTrigger;
