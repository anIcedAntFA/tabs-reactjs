import cx from 'clsx';

import { TabListProps } from './tabs.type';

import './tabs.style.css';

function TabList({ className, children, ...passProps }: TabListProps) {
  return (
    <div
      className={cx('tabs-list', className)}
      role='tablist'
      aria-orientation='horizontal'
      {...passProps}
    >
      {children}
    </div>
  );
}

export default TabList;
