import { useState } from 'react';
import './App.css';
import {
  BaseValue,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanelGroup,
  Tabs,
  TabTrigger,
} from './components/tabs';

function App() {
  const [activeValue, setActiveValue] = useState<BaseValue>(1);

  return (
    <div className='app-wrapper'>
      <div className='tabs-wrapper'>
        <Tabs
          // orientation='vertical'
          value={activeValue}
          // activeFocusedMode
          // lazyMount
          // lazyBehavior='keepMounted'
          onChange={(value) => setActiveValue(value)}
        >
          <TabList>
            <TabTrigger value={0}>All results</TabTrigger>
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
              <p>
                tab content 1 Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Ut maxime nesciunt mollitia repellat distinctio ipsa.
                Culpa perferendis voluptatibus ratione repudiandae quam amet hic
                praesentium dolorum provident quasi ut, unde deserunt dolore
                harum reprehenderit? Eos natus similique obcaecati laborum.
              </p>
              <img
                src='https://images.unsplash.com/photo-1711309731095-34e7f5db7c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D'
                alt='image'
                className='image'
              />
            </TabPanel>
            <TabPanel value={1}>
              <p>
                tab content 2 Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Enim esse molestias magni aliquam deserunt modi repellat
                voluptate pariatur voluptates? Aliquid dignissimos delectus
                beatae, minus nobis, amet eligendi ratione cumque veniam, vitae
                adipisci!
              </p>
              <img
                src='https://images.unsplash.com/photo-1710976329659-7763e7dc5d4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D'
                alt='image'
                className='image'
              />
            </TabPanel>
            <TabPanel value={2}>
              <p>
                tab content 3 Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Voluptas, consectetur? Maiores ratione quasi, consequuntur
                debitis maxime suscipit eos illo natus dicta architecto
                accusamus facere consectetur minima delectus quos hic qui, enim
                aliquid deserunt sint laudantium aperiam quo exercitationem
                earum! Quidem modi sunt id itaque eligendi?
              </p>
              <img
                src='https://images.unsplash.com/photo-1710797213431-c89129979ca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D'
                alt='image'
                className='image'
              />
            </TabPanel>
            <TabPanel value={3}>
              <p>
                tab content 4 Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Quod praesentium illo, enim quasi asperiores assumenda
                saepe ea. Hic aliquid, eos nesciunt aspernatur at ipsam, nemo
                totam quos ea laborum non consequuntur adipisci omnis eaque quis
                maiores magnam quaerat! Ad, dignissimos?
              </p>
              <img
                src='https://images.unsplash.com/photo-1710762634511-437ff5268243?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D'
                alt='image'
                className='image'
              />
            </TabPanel>
            <TabPanel value={4}>
              <p>
                tab content 5 Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Asperiores dolorum quod ab sunt ea eius dolores, facilis
                iusto eos, quas quae quidem temporibus non vitae? Id in expedita
                assumenda sequi quia recusandae amet tenetur ab.
              </p>
              <img
                src='https://images.unsplash.com/photo-1709248835088-03bb0946d6ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8fA%3D%3D'
                alt='image'
                className='image'
              />
            </TabPanel>
          </TabPanelGroup>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
