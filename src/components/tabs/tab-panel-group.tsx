import cx from 'clsx';

import './tabs.style.css';
import { TabPanelGroupProps } from './tabs.type';

function TabPanels({ className, children, ...passProps }: TabPanelGroupProps) {
  return (
    <div className={cx('tab-panel-group', className)} {...passProps}>
      {children}
    </div>
  );
}

export default TabPanels;
