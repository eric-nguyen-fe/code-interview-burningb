import { Story, Meta } from '@storybook/react';
import React from 'react';

import CardProduct from '.';

export default {
  title: 'Components/molecules/CardProduct',
  component: CardProduct,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <CardProduct product={{} as any} />
);
