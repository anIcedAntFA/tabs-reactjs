import { useLayoutEffect, useRef } from 'react';
import { useTabsContext } from './tabs.context';
import './tabs.style.css';

function TabIndicator() {
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const isFirstRender = useRef(true);

  const { activeValue, rootRef } = useTabsContext();

  //* useEffect runs asynchronously and after a render is painted to the screen.
  //* You cause a visual break if your effect changes something in the DOM
  //* that will cause an additional render.

  //* useLayoutEffect runs synchronously immediately after React has performed all DOM mutations.
  //* This can be useful if you need to make DOM measurements(like in your case)
  //* and then make DOM mutations or trigger a synchronous re-render by updating state.

  //todo useLayoutEffect instead of useEffect to prevent visual break
  useLayoutEffect(() => {
    if (!rootRef.current || !indicatorRef.current) return;

    const currentActiveTab =
      rootRef.current.ownerDocument.querySelector<HTMLButtonElement>(
        `[data-index="${activeValue}"]`
      );

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else
      indicatorRef.current.style.transition = `left 0.4s cubic-bezier(0, 0.2, 0.4, 1.1),
    width 0.4s cubic-bezier(0, 0.2, 0.4, 1.1)`;

    if (!currentActiveTab) return;

    indicatorRef.current.style.left = `${currentActiveTab.offsetLeft}px`;
    indicatorRef.current.style.width = `${currentActiveTab.offsetWidth}px`;
  }, [activeValue, rootRef]);

  return <span ref={indicatorRef} className='tab-indicator'></span>;
}

export default TabIndicator;
