import cx from 'clsx';
import { useRef } from 'react';

import { useTabsContext } from './tabs.context';
import { generateTabId, generateTabPanelId, lazyControl } from './tabs.helper';
import { TabPanelProps } from './tabs.type';

import './tabs.style.css';

function TabPanel({
  value: currentValue,
  className,
  children,
  ...passProps
}: TabPanelProps) {
  const hasBeenActive = useRef<boolean>(false);

  const { id, activeValue, lazyMount, lazyBehavior } = useTabsContext();

  const isActiveTab = activeValue === currentValue;

  if (isActiveTab) hasBeenActive.current = true;

  const shouldRender = lazyControl({
    enabled: lazyMount,
    isActive: isActiveTab,
    wasActive: hasBeenActive.current,
    mode: lazyBehavior,
  });

  return (
    <>
      {shouldRender ? (
        <div
          id={generateTabPanelId(id, currentValue)}
          hidden={!isActiveTab}
          role='tabpanel'
          aria-labelledby={generateTabId(id, currentValue)}
          tabIndex={0}
          className={cx(
            'tab-panel',
            {
              ['tab-panel--active']: isActiveTab,
            },
            className
          )}
          {...passProps}
        >
          {children}
        </div>
      ) : null}
    </>
  );
}

export default TabPanel;
