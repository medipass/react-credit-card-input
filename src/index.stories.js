import React from 'react';
import { storiesOf } from '@storybook/react';
import CreditCardInput from '.';

storiesOf('CreditCardInput', module)
  .add('default', () => (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}><CreditCardInput /></div>
  ))
