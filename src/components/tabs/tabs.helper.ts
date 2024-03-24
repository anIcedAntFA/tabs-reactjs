import { LazyControl } from './tabs.type';

export const lazyControl = ({
  enabled,
  isActive,
  wasActive,
  mode,
}: LazyControl) => {
  if (!enabled) return true;

  if (isActive) return true;

  if (mode === 'keepMounted' && wasActive) return true;

  return false;
};
