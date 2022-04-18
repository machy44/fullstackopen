import React from 'react';

import { NavItem as BNavItem } from './Navigation';

export default {
  title: 'Navigation',
  component: BNavItem
};

const Template = (args) => <BNavItem {...args} />;

export const NavItem = Template.bind({});

NavItem.args = {
  to: '/',
  children: 'story'
};
