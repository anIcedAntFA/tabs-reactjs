import cx from 'clsx';

import { useTabsContext } from './tabs.context';
import { generateTabId, generateTabPanelId } from './tabs.helper';
import './tabs.style.css';
import { TabTriggerProps } from './tabs.type';

function TabTrigger({
  value: currentValue,
  disabled,
  className,
  children,
  ...passProps
}: TabTriggerProps) {
  const {
    id,
    orientation,
    activeValue,
    activeFocusedMode,
    onChangeTab,
    setFocusedValue,
  } = useTabsContext();

  const isActive = activeValue === currentValue;

  const handleClick = () => {
    if (!disabled) onChangeTab(currentValue);
  };

  const handleFocus = () => {
    setFocusedValue(currentValue);

    if (activeFocusedMode) onChangeTab(currentValue);
  };

  return (
    <button
      id={generateTabId(id, currentValue)}
      type='button'
      role='tab'
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      aria-disabled={disabled}
      aria-controls={generateTabPanelId(id, currentValue)}
      data-index={currentValue}
      disabled={disabled}
      className={cx(
        'tab-trigger',
        {
          [`tab-trigger--${orientation}`]: orientation,
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
