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
          <TabPanel value={0}>
            tab content 1
            <img
              src='https://images.unsplash.com/photo-1711309731095-34e7f5db7c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D'
              alt='image'
            />
          </TabPanel>
          <TabPanel value={1}>
            tab content 2{' '}
            <img
              src='https://images.unsplash.com/photo-1710976329659-7763e7dc5d4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D'
              alt='image'
            />
          </TabPanel>
          <TabPanel value={2}>
            tab content 3{' '}
            <img
              src='https://images.unsplash.com/photo-1710797213431-c89129979ca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D'
              alt='image'
            />
          </TabPanel>
          <TabPanel value={3}>
            tab content 4{' '}
            <img
              src='https://images.unsplash.com/photo-1710762634511-437ff5268243?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D'
              alt='image'
            />
          </TabPanel>
          <TabPanel value={4}>
            tab content 5{' '}
            <img
              src='https://images.unsplash.com/photo-1709248835088-03bb0946d6ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8fA%3D%3D'
              alt='image'
            />
          </TabPanel>
        </TabPanelGroup>
      </Tabs>
    </>
  );
}

export default App;
