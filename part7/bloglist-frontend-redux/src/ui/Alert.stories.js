import React from 'react';

import { Alert as BAlert } from './Alert';

export default {
  title: 'Alert',
  component: BAlert
};

const Template = (args) => <BAlert {...args} />;

export const SuccessAlert = Template.bind({});

SuccessAlert.args = {
  status: 'success',
  message: 'success'
};

export const ErrorAlert = Template.bind({});

ErrorAlert.args = {
  status: 'error',
  message: 'error'
};
