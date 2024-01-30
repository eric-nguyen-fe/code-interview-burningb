import { Story, Meta } from '@storybook/react';
import React from 'react';

import AppSearch from '.';

export default {
  title: 'Components/molecules/AppSearch',
  component: AppSearch,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <AppSearch value={''} onChange={function (value: string): void {
    throw new Error('Function not implemented.');
  }} handleClickSearch={function (): void {
    throw new Error('Function not implemented.');
  }} handleReset={function (): void {
    throw new Error('Function not implemented.');
  }} />
);
