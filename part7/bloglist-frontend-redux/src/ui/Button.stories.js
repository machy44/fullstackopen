import React from 'react';

import { Button as BButton } from './Button';

export default {
  title: 'Button',
  component: BButton
};

const Template = (args) => <BButton {...args} />;

export const Button = Template.bind({});

Button.args = {
  type: 'button',
  children: 'story'
};
