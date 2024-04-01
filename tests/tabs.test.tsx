import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  BaseValue,
  TabList,
  TabPanel,
  TabPanelGroup,
  Tabs,
  TabTrigger,
} from '../src/components/tabs';

describe('Tabs', () => {
  it('should select the correct tab when clicked', async () => {
    const RenderComponent = () => {
      const [selectedTab, setSelectedTab] = useState<BaseValue>(1);

      return (
        <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value)}>
          <TabList>
            <TabTrigger value={1}>Tab 1</TabTrigger>
            <TabTrigger value={2}>Tab 2</TabTrigger>
            <TabTrigger value={3}>Tab 3</TabTrigger>
            <TabTrigger value={4} disabled>
              Tab 4
            </TabTrigger>
          </TabList>
          <TabPanelGroup>
            <TabPanel value={1}>Tab 1 content</TabPanel>
            <TabPanel value={2}>Tab 2 content</TabPanel>
            <TabPanel value={3}>Tab 3 content</TabPanel>
            <TabPanel value={4}>Tab 4 content</TabPanel>
          </TabPanelGroup>
        </Tabs>
      );
    };

    render(<RenderComponent />);

    const tabList = screen.getByRole('tablist');

    expect(tabList).toHaveAttribute('aria-orientation', 'horizontal');

    const tabs = within(tabList).getAllByRole('tab');

    const user = userEvent.setup();

    await user.click(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');

    await user.click(tabs[2]);
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');

    // await user.click(tabs[3]);
    // expect(tabs[3]).not.toHaveBeenCalled();
  });

  it('should select the correct tab with keyboard navigation', async () => {
    const RenderComponent = () => {
      const [selectedTab, setSelectedTab] = useState<BaseValue>(1);

      return (
        <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value)}>
          <TabList>
            <TabTrigger value={1}>Tab 1</TabTrigger>
            <TabTrigger value={2}>Tab 2</TabTrigger>
            <TabTrigger value={3} disabled>
              Tab 3
            </TabTrigger>
            <TabTrigger value={4}>Tab 4</TabTrigger>
          </TabList>
          <TabPanelGroup>
            <TabPanel value={1}>Tab 1 content</TabPanel>
            <TabPanel value={2}>Tab 2 content</TabPanel>
            <TabPanel value={3}>Tab 3 content</TabPanel>
            <TabPanel value={4}>Tab 4 content</TabPanel>
          </TabPanelGroup>
        </Tabs>
      );
    };

    render(<RenderComponent />);

    const user = userEvent.setup();

    const tab1 = screen.getByText('Tab 1');
    const tabPanel1 = screen.getByText('Tab 1 content');

    const tab2 = screen.getByText('Tab 2');
    const tabPanel2 = screen.getByText('Tab 2 content');

    const tab4 = screen.getByText('Tab 4');
    const tabPanel4 = screen.getByText('Tab 4 content');

    await user.click(tab1);
    await user.keyboard('[ArrowRight]');

    expect(tab2).toHaveFocus();
    expect(tab1).not.toHaveFocus();

    await user.keyboard('[Enter]');

    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(tabPanel2).toBeVisible();
    expect(tab1).toHaveAttribute('aria-selected', 'false');
    expect(tabPanel1).not.toBeVisible();

    await user.keyboard('[ArrowRight]');

    expect(tab4).toHaveFocus();

    await user.keyboard('[Space]');

    expect(tab4).toHaveAttribute('aria-selected', 'true');
    expect(tabPanel4).toBeVisible();
    expect(tabPanel2).not.toBeVisible();

    await user.keyboard('[ArrowRight]');

    expect(tab1).toHaveFocus();

    await user.keyboard('[ArrowLeft]');

    expect(tab4).toHaveFocus();

    await user.keyboard('[ArrowLeft]');
    await user.keyboard('[ArrowLeft]');

    expect(tab1).toHaveFocus();

    await user.keyboard('[End]');

    expect(tab4).toHaveFocus();

    await user.keyboard('[Home]');

    expect(tab1).toHaveFocus();

    await user.keyboard('[Escape]');

    expect(tab1).not.toHaveFocus();
  });

  it(`should select the correct tab with keyboard navigation 
    if activeFocusedMode is enabled and orientation is vertical`, async () => {
    const RenderComponent = () => {
      const [selectedTab, setSelectedTab] = useState<BaseValue>(1);

      return (
        <Tabs
          value={selectedTab}
          onChange={(value) => setSelectedTab(value)}
          orientation='vertical'
          activeFocusedMode
        >
          <TabList>
            <TabTrigger value={1}>Tab 1</TabTrigger>
            <TabTrigger value={2}>Tab 2</TabTrigger>
            <TabTrigger value={3}>Tab 3</TabTrigger>
          </TabList>
          <TabPanelGroup>
            <TabPanel value={1}>Tab 1 content</TabPanel>
            <TabPanel value={2}>Tab 2 content</TabPanel>
            <TabPanel value={3}>Tab 3 content</TabPanel>
          </TabPanelGroup>
        </Tabs>
      );
    };

    render(<RenderComponent />);

    const tabList = screen.getByRole('tablist');

    expect(tabList).toHaveAttribute('aria-orientation', 'vertical');

    const user = userEvent.setup();

    const tab1 = screen.getByText('Tab 1');
    const tabPanel1 = screen.getByText('Tab 1 content');

    const tab2 = screen.getByText('Tab 2');
    const tabPanel2 = screen.getByText('Tab 2 content');

    const tab3 = screen.getByText('Tab 3');
    const tabPanel3 = screen.getByText('Tab 3 content');

    await user.click(tab1);
    await user.keyboard('[ArrowDown]');

    expect(tab2).toHaveFocus();
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(tabPanel2).toBeVisible();
    expect(tabPanel1).not.toBeVisible();

    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');

    expect(tab1).toHaveFocus();
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tabPanel1).toBeVisible();

    await user.keyboard('[ArrowUp]');

    expect(tab3).toHaveFocus();
    expect(tab3).toHaveAttribute('aria-selected', 'true');
    expect(tabPanel3).toBeVisible();
    expect(tabPanel1).not.toBeVisible();
  });

  it('should render only the active tab panel if lazyMount is enabled', async () => {
    const RenderComponent = () => {
      const [selectedTab, setSelectedTab] = useState<BaseValue>(1);

      return (
        <Tabs
          value={selectedTab}
          onChange={(value) => setSelectedTab(value)}
          lazyMount
        >
          <TabList>
            <TabTrigger value={1}>Tab 1</TabTrigger>
            <TabTrigger value={2}>Tab 2</TabTrigger>
          </TabList>
          <TabPanelGroup>
            <TabPanel value={1}>Tab 1 content</TabPanel>
            <TabPanel value={2}>Tab 2 content</TabPanel>
          </TabPanelGroup>
        </Tabs>
      );
    };

    render(<RenderComponent />);

    expect(screen.getByText('Tab 1 content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 2 content')).not.toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(screen.getByText('Tab 2'));

    expect(screen.queryByText('Tab 1 content')).not.toBeInTheDocument();
    expect(screen.getByText('Tab 2 content')).toBeInTheDocument();
  });

  it(`should render the currently active tab panel and previously-selected tabs
    if lazyMount and lazy behavior is keepMounted`, async () => {
    const RenderComponent = () => {
      const [selectedTab, setSelectedTab] = useState<BaseValue>(2);

      return (
        <Tabs
          value={selectedTab}
          onChange={(value) => setSelectedTab(value)}
          lazyMount
          lazyBehavior='keepMounted'
        >
          <TabList>
            <TabTrigger value={1}>Tab 1</TabTrigger>
            <TabTrigger value={2}>Tab 2</TabTrigger>
            <TabTrigger value={3}>Tab 3</TabTrigger>
          </TabList>
          <TabPanelGroup>
            <TabPanel value={1}>Tab 1 content</TabPanel>
            <TabPanel value={2}>Tab 2 content</TabPanel>
            <TabPanel value={3}>Tab 3 content</TabPanel>
          </TabPanelGroup>
        </Tabs>
      );
    };

    render(<RenderComponent />);

    expect(screen.getByText('Tab 2 content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 1 content')).not.toBeInTheDocument();
    expect(screen.queryByText('Tab 3 content')).not.toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(screen.getByText('Tab 1'));
    expect(screen.getByText('Tab 2 content')).toBeInTheDocument();
    expect(screen.getByText('Tab 1 content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 3 content')).not.toBeInTheDocument();

    await user.click(screen.getByText('Tab 3'));
    expect(screen.getByText('Tab 3 content')).toBeInTheDocument();
    expect(screen.getByText('Tab 2 content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 1 content')).toBeInTheDocument();
  });
});
