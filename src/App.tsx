import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  Tabs,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanelGroup,
  TabTrigger,
} from './components/tabs';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tabs defaultValue={1} lazyMount lazyBehavior='keepMounted'>
        <TabList>
          <TabTrigger value={0}>
            <span>All results</span>
            <span className='quantity'>23</span>
          </TabTrigger>
          <TabTrigger value={1}>Pending</TabTrigger>
          <TabTrigger value={2}>Completed</TabTrigger>
          <TabTrigger value={3} disabled>
            Cancelled
          </TabTrigger>
          <TabTrigger value={4}>Refund</TabTrigger>
        </TabList>
        <TabIndicator />
        <TabPanelGroup>
          <TabPanel value={0}>tab content 1</TabPanel>
          <TabPanel value={1}>tab content 2</TabPanel>
          <TabPanel value={2}>tab content 3</TabPanel>
          <TabPanel value={3}>tab content 4</TabPanel>
          <TabPanel value={4}>tab content 5</TabPanel>
        </TabPanelGroup>
      </Tabs>
    </>
  );
}

export default App;
