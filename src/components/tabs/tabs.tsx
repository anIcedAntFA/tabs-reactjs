import cx from 'clsx';
import { ElementRef, useRef, useState } from 'react';

import { TabProvider } from './tabs.context';
import { BaseValue, TabsProps } from './tabs.type';
import { DEFAULT_ACTIVE_INDEX } from './tabs.config';

import './tabs.style.css';

function Tabs({
  defaultValue = DEFAULT_ACTIVE_INDEX,
  value,
  activeFocusedMode = false,
  lazyMount = false,
  lazyBehavior = 'unmount',
  className,
  onChange,
  children,
  ...passProps
}: TabsProps) {
  const [activeValue, setActiveValue] = useState<BaseValue>(defaultValue);

  const [focusedValue, setFocusedValue] = useState<BaseValue>(defaultValue);

  const tabsRootRef = useRef<ElementRef<'div'>>(null);

  const handleChangeTab = (newValue: BaseValue) => {
    setActiveValue(newValue);
  };

  const contextValue = {
    rootRef: tabsRootRef,
    activeValue: value ?? activeValue,
    activeFocusedMode,
    focusedValue,
    lazyMount,
    lazyBehavior,
    onChangeTab: onChange ?? handleChangeTab,
    setFocusedValue,
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
