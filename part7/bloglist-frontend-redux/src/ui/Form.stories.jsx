import React from 'react';

import {
  FormInput as BFormInput
  // , Form as BFormInput
} from './Form';

export default {
  title: 'Form',
  component: BFormInput
};

const Template = (args) => <BFormInput {...args} />;

export const FormInput = Template.bind({});

FormInput.args = {
  htmlFor: 'name',
  labelText: 'username',
  dataTestId: 'username',
  id: 'name',
  type: 'name',
  value: 'test',
  onChange: () => {},
  isRequired: true
};

// export const Form =
