import cx from 'clsx';
import { useId, useRef } from 'react';

import { useTabsContext } from './tabs.context';
import { lazyControl } from './tabs.helper';
import { TabPanelProps } from './tabs.type';

import './tabs.style.css';

function TabPanel({
  id,
  value: currentValue,
  className,
  children,
  ...passProps
}: TabPanelProps) {
  const internalID = useId();

  const hasBeenActive = useRef<boolean>(false);

  const { activeValue, lazyMount, lazyBehavior } = useTabsContext();

  const isActiveTab = activeValue === currentValue;

  if (isActiveTab) hasBeenActive.current = true;

  const shouldRenderContent = lazyControl({
    enabled: lazyMount,
    isActive: isActiveTab,
    wasActive: hasBeenActive.current,
    mode: lazyBehavior,
  });

  return (
    <>
      {shouldRenderContent ? (
        <div
          id={id ?? `tabs-${internalID}--tabpanel-${currentValue}`}
          hidden={!isActiveTab}
          role='tabpanel'
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
