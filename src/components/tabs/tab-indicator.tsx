import { useLayoutEffect, useRef, useState } from 'react';
import { useTabsContext } from './tabs.context';
import './tabs.style.css';

type TabIndicatorRect = {
  left: number;
  width: number;
};

function TabIndicator() {
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // const [rect, setRect] = useState<TabIndicatorRect>({
  //   left: 0,
  //   width: 0,
  // });
  // const [hasMeasured, setHasMeasured] = useState<boolean>(false);

  const { activeValue, rootRef } = useTabsContext();
  const isFirstRender = useRef(true);

  //* useEffect runs asynchronously and after a render is painted to the screen.
  //* You cause a visual break if your effect changes something in the DOM
  //* that will cause an additional render.

  //* useLayoutEffect runs synchronously immediately after React has performed all DOM mutations.
  //* This can be useful if you need to make DOM measurements(like in your case)
  //* and then make DOM mutations or trigger a synchronous re-render by updating state.

  //todo useLayoutEffect instead of useEffect to prevent visual break
  useLayoutEffect(() => {
    if (!rootRef.current || !indicatorRef.current) return;

    const currentActiveTab = rootRef.current.ownerDocument.querySelector(
      `[data-index="${activeValue}"]`
    ) as HTMLButtonElement;

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else
      indicatorRef.current.style.transition = `left 0.4s cubic-bezier(0, 0.2, 0.4, 1.1),
    width 0.4s cubic-bezier(0, 0.2, 0.4, 1.1)`;

    indicatorRef.current.style.left = `${currentActiveTab.offsetLeft}px`;
    indicatorRef.current.style.width = `${currentActiveTab.offsetWidth}px`;

    // setRect({
    //   left: currentActiveTab.offsetLeft,
    //   width: currentActiveTab.offsetWidth,
    // });

    // //* The requestAnimationFrame function is used to delay the setting of hasMeasured to true
    // //* until the next repaint.This is done to prevent an unwanted transition
    // //* from 0 to the measured rect.
    // const rafID = requestAnimationFrame(() => {
    //   setHasMeasured(true);
    // });

    // return () => {
    //   if (rafID) cancelAnimationFrame(rafID);
    // };
  }, [activeValue, rootRef]);

  return (
    <span
      ref={indicatorRef}
      className={'tab-indicator'}
      // style={{
      //   left: rect.left,
      //   width: rect.width,
      //   transitionDuration: hasMeasured ? '0.4s' : '0s',
      // }}
    ></span>
  );
}

export default TabIndicator;
