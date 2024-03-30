import cx from 'clsx';
import { useId } from 'react';

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

  const { activeValue, activeFocusedMode, onChangeTab, setFocusedValue } =
    useTabsContext();

  const isActive = activeValue === currentValue;

  const handleClick = () => {
    if (disabled) return;
    onChangeTab(currentValue);
  };

  const handleFocus = () => {
    setFocusedValue(currentValue);

    if (activeFocusedMode) onChangeTab(currentValue);
  };

  return (
    <button
      id={`tabs-${id}--tab-${currentValue}`}
      type='button'
      role='tab'
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      aria-disabled={disabled}
      data-index={currentValue}
      disabled={disabled}
      className={cx(
        'tab-trigger',
        {
          ['tab-trigger--active']: isActive,
          ['tab-trigger--disabled']: disabled,
        },
        className
      )}
      onClick={handleClick}
      onFocus={handleFocus}
      {...passProps}
    >
      {children}
    </button>
  );
}

export default TabTrigger;
