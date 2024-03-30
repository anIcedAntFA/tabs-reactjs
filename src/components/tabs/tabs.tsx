import cx from 'clsx';
import { ElementRef, useId, useRef, useState } from 'react';

import { Orientations } from './tabs.config';
import { TabProvider } from './tabs.context';
import { BaseValue, TabsProps } from './tabs.type';

import './tabs.style.css';

function Tabs({
  value,
  onChange,
  orientation = Orientations.HORIZONTAL,
  activeFocusedMode = false,
  lazyMount = false,
  lazyBehavior = 'unmount',
  className,
  children,
  ...passProps
}: TabsProps) {
  const [focusedValue, setFocusedValue] = useState<BaseValue>('');

  const tabsRootRef = useRef<ElementRef<'div'>>(null);

  const reactID = useId();
  const internalID = passProps.id ?? reactID;
  const tabsID = `tabs-${internalID}`;

  const contextValue = {
    id: tabsID,
    orientation,
    rootRef: tabsRootRef,
    activeValue: value,
    activeFocusedMode,
    focusedValue,
    lazyMount,
    lazyBehavior,
    onChangeTab: onChange,
    setFocusedValue,
  };

  return (
    <TabProvider value={contextValue}>
      <div
        ref={tabsRootRef}
        className={cx(
          'tabs-root',
          {
            [`tabs-root--${orientation}`]: orientation,
          },
          className
        )}
        {...passProps}
      >
        {children}
      </div>
    </TabProvider>
  );
}

export default Tabs;
