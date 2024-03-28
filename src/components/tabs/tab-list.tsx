import cx from 'clsx';

import { TabListProps } from './tabs.type';

import './tabs.style.css';
import { useEffect } from 'react';
// import { useTabsContext } from './tabs.context';

function TabList({ className, children, ...passProps }: TabListProps) {
  // const { activeValue, onChangeTab } = useTabsContext();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const nextTab = document.activeElement
        ?.nextElementSibling as HTMLButtonElement;
      const prevTab = document.activeElement
        ?.previousElementSibling as HTMLButtonElement;

      console.log('mouse', nextTab, prevTab);

      if (event.key === 'ArrowRight' && nextTab) {
        nextTab.focus();
      } else if (event.key === 'ArrowLeft' && prevTab) {
        prevTab.focus();
      }
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
