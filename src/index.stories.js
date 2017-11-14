import React from 'react';
import { storiesOf } from '@storybook/react';
import CreditCardInput from '.';

storiesOf('CreditCardInput', module)
  .add('default', () => (
    <CreditCardInput />
  ))
