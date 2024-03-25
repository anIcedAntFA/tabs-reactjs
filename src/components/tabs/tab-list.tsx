import cx from 'clsx';

import { TabListProps } from './tabs.type';

import './tabs.style.css';
import { useEffect } from 'react';
import { useTabsContext } from './tabs.context';

function TabList({ className, children, ...passProps }: TabListProps) {
  const { activeValue, onChangeTab } = useTabsContext();

  useEffect(() => {
    const handleKeyDown = () => {
      console.log('in');

      const nextTab = document.activeElement?.nextElementSibling as HTMLElement;

      console.log({ nextTab });

      nextTab.focus();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      role='tablist'
      aria-orientation='horizontal'
      className={cx('tabs-list', className)}
      {...passProps}
    >
      {children}
    </div>
  );
}

export default TabList;
