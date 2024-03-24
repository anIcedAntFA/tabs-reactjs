import cx from 'clsx';
import { ElementRef, useRef, useState } from 'react';

import { TabProvider } from './tabs.context';
import { TabsProps } from './tabs.type';
import { DEFAULT_ACTIVE_INDEX } from './tabs.config';

import './tabs.style.css';

function Tabs({
  defaultValue = DEFAULT_ACTIVE_INDEX,
  value,
  lazyMount = false,
  lazyBehavior = 'unmount',
  className,
  onChange,
  children,
  ...passProps
}: TabsProps) {
  const [activeValue, setActiveValue] = useState<number>(defaultValue);

  const tabsRootRef = useRef<ElementRef<'div'>>(null);

  const onChangeTab = (newValue: number) => {
    setActiveValue(newValue);
  };

  const contextValue = {
    rootRef: tabsRootRef,
    activeValue: value ?? activeValue,
    lazyMount,
    lazyBehavior,
    onChangeTab: onChange ?? onChangeTab,
  };

  return (
    <TabProvider value={contextValue}>
      <div
        ref={tabsRootRef}
        className={cx('tabs-root', className)}
        {...passProps}
      >
        {children}
      </div>
    </TabProvider>
  );
}

export default Tabs;
