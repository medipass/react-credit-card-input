import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import CreditCardInput from '.';
import './index.stories.css';

const Container = styled.div`
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-size: 16px;
  font-variant: normal;
  margin: 0;
  padding: 20px;
  -webkit-font-smoothing: antialiased;
`;

storiesOf('CreditCardInput', module)
  .add('default', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        cardCVCInputProps={{
          onBlur: e => console.log('cvc blur', e),
          onChange: e => console.log('cvc change', e),
          onError: err => console.log(`cvc error: ${err}`)
        }}
        cardExpiryInputProps={{
          onBlur: e => console.log('expiry blur', e),
          onChange: e => console.log('expiry change', e),
          onError: err => console.log(`expiry error: ${err}`)
        }}
        cardNumberInputProps={{
          onBlur: e => console.log('number blur', e),
          onChange: e => console.log('number change', e),
          onError: err => console.log(`number error: ${err}`)
        }}
      />
    </Container>
  ))
  .add('with zip field enabled', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput enableZipInput />
    </Container>
  ))
  .add('with pre-filled values', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        cardCVCInputProps={{ value: '123' }}
        cardExpiryInputProps={{ value: '05 / 21' }}
        cardNumberInputProps={{ value: '4242 4242 4242 4242' }}
      />
    </Container>
  ))
  .add('custom image', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        cardImageStyle={{
          height: '1.5em',
          width: '2em'
        }}
        images={{
          dinersclub: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDggNDgiIHZlcnNpb249IjEuMSIgd2lkdGg9IjQ4cHgiIGhlaWdodD0iNDhweCI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSIgZmlsbDojRTFFN0VBOyIgZD0iTSA0NSAzNSBDIDQ1IDM3LjE5OTIxOSA0My4xOTkyMTkgMzkgNDEgMzkgTCA3IDM5IEMgNC44MDA3ODEgMzkgMyAzNy4xOTkyMTkgMyAzNSBMIDMgMTMgQyAzIDEwLjgwMDc4MSA0LjgwMDc4MSA5IDcgOSBMIDQxIDkgQyA0My4xOTkyMTkgOSA0NSAxMC44MDA3ODEgNDUgMTMgWiAiLz4KPHBhdGggc3R5bGU9IiBmaWxsOiNGRjZEMDA7IiBkPSJNIDQ1IDM1IEMgNDUgMzcuMTk5MjE5IDQzLjE5OTIxOSAzOSA0MSAzOSBMIDE2IDM5IEMgMTYgMzkgMzkuNjAxNTYzIDM1LjE5OTIxOSA0NSAyNCBaIE0gMjIgMjQgQyAyMiAyNS42OTkyMTkgMjMuMzAwNzgxIDI3IDI1IDI3IEMgMjYuNjk5MjE5IDI3IDI4IDI1LjY5OTIxOSAyOCAyNCBDIDI4IDIyLjMwMDc4MSAyNi42OTkyMTkgMjEgMjUgMjEgQyAyMy4zMDA3ODEgMjEgMjIgMjIuMzAwNzgxIDIyIDI0IFogIi8+CjxwYXRoIHN0eWxlPSIgIiBkPSJNIDExLjE5OTIxOSAyMSBMIDEyLjMwMDc4MSAyMSBMIDEyLjMwMDc4MSAyNyBMIDExLjE5OTIxOSAyNyBaIE0gMTcuMTk5MjE5IDI0IEMgMTcuMTk5MjE5IDI1LjY5OTIxOSAxOC41IDI3IDIwLjE5OTIxOSAyNyBDIDIwLjY5OTIxOSAyNyAyMS4xMDE1NjMgMjYuODk4NDM4IDIxLjYwMTU2MyAyNi42OTkyMTkgTCAyMS42MDE1NjMgMjUuMzk4NDM4IEMgMjEuMTk5MjE5IDI1LjgwMDc4MSAyMC44MDA3ODEgMjYgMjAuMTk5MjE5IDI2IEMgMTkuMTAxNTYzIDI2IDE4LjMwMDc4MSAyNS4xOTkyMTkgMTguMzAwNzgxIDI0IEMgMTguMzAwNzgxIDIyLjg5ODQzOCAxOS4xMDE1NjMgMjIgMjAuMTk5MjE5IDIyIEMgMjAuNjk5MjE5IDIyIDIxLjEwMTU2MyAyMi4xOTkyMTkgMjEuNjAxNTYzIDIyLjYwMTU2MyBMIDIxLjYwMTU2MyAyMS4zMDA3ODEgQyAyMS4xMDE1NjMgMjEuMTAxNTYzIDIwLjY5OTIxOSAyMC44OTg0MzggMjAuMTk5MjE5IDIwLjg5ODQzOCBDIDE4LjUgMjEgMTcuMTk5MjE5IDIyLjM5ODQzOCAxNy4xOTkyMTkgMjQgWiBNIDMwLjYwMTU2MyAyNC44OTg0MzggTCAyOSAyMSBMIDI3LjgwMDc4MSAyMSBMIDMwLjMwMDc4MSAyNyBMIDMwLjg5ODQzOCAyNyBMIDMzLjM5ODQzOCAyMSBMIDMyLjE5OTIxOSAyMSBaIE0gMzMuODk4NDM4IDI3IEwgMzcuMTAxNTYzIDI3IEwgMzcuMTAxNTYzIDI2IEwgMzUgMjYgTCAzNSAyNC4zOTg0MzggTCAzNyAyNC4zOTg0MzggTCAzNyAyMy4zOTg0MzggTCAzNSAyMy4zOTg0MzggTCAzNSAyMiBMIDM3LjEwMTU2MyAyMiBMIDM3LjEwMTU2MyAyMSBMIDMzLjg5ODQzOCAyMSBaIE0gNDEuNSAyMi44MDA3ODEgQyA0MS41IDIxLjY5OTIxOSA0MC44MDA3ODEgMjEgMzkuNSAyMSBMIDM3LjgwMDc4MSAyMSBMIDM3LjgwMDc4MSAyNyBMIDM4Ljg5ODQzOCAyNyBMIDM4Ljg5ODQzOCAyNC42MDE1NjMgTCAzOSAyNC42MDE1NjMgTCA0MC42MDE1NjMgMjcgTCA0MiAyNyBMIDQwLjE5OTIxOSAyNC41IEMgNDEgMjQuMzAwNzgxIDQxLjUgMjMuNjk5MjE5IDQxLjUgMjIuODAwNzgxIFogTSAzOS4xOTkyMTkgMjMuODAwNzgxIEwgMzguODk4NDM4IDIzLjgwMDc4MSBMIDM4Ljg5ODQzOCAyMiBMIDM5LjE5OTIxOSAyMiBDIDM5Ljg5ODQzOCAyMiA0MC4zMDA3ODEgMjIuMzAwNzgxIDQwLjMwMDc4MSAyMi44OTg0MzggQyA0MC4zMDA3ODEgMjMuMzk4NDM4IDQwIDIzLjgwMDc4MSAzOS4xOTkyMTkgMjMuODAwNzgxIFogTSA3LjY5OTIxOSAyMSBMIDYgMjEgTCA2IDI3IEwgNy42MDE1NjMgMjcgQyAxMC4xMDE1NjMgMjcgMTAuNjk5MjE5IDI0Ljg5ODQzOCAxMC42OTkyMTkgMjQgQyAxMC44MDA3ODEgMjIuMTk5MjE5IDkuNSAyMSA3LjY5OTIxOSAyMSBaIE0gNy4zOTg0MzggMjYgTCA3LjEwMTU2MyAyNiBMIDcuMTAxNTYzIDIyIEwgNy41IDIyIEMgOSAyMiA5LjYwMTU2MyAyMyA5LjYwMTU2MyAyNCBDIDkuNjAxNTYzIDI0LjM5ODQzOCA5LjUgMjYgNy4zOTg0MzggMjYgWiBNIDE1LjMwMDc4MSAyMy4zMDA3ODEgQyAxNC42MDE1NjMgMjMgMTQuMzk4NDM4IDIyLjg5ODQzOCAxNC4zOTg0MzggMjIuNjAxNTYzIEMgMTQuMzk4NDM4IDIyLjE5OTIxOSAxNC44MDA3ODEgMjIgMTUuMTk5MjE5IDIyIEMgMTUuNSAyMiAxNS44MDA3ODEgMjIuMTAxNTYzIDE2LjEwMTU2MyAyMi41IEwgMTYuNjk5MjE5IDIxLjY5OTIxOSBDIDE2LjE5OTIxOSAyMS4xOTkyMTkgMTUuNjk5MjE5IDIxIDE1IDIxIEMgMTQgMjEgMTMuMTk5MjE5IDIxLjY5OTIxOSAxMy4xOTkyMTkgMjIuNjk5MjE5IEMgMTMuMTk5MjE5IDIzLjUgMTMuNjAxNTYzIDIzLjg5ODQzOCAxNC42MDE1NjMgMjQuMzAwNzgxIEMgMTUuMTk5MjE5IDI0LjUgMTUuNjk5MjE5IDI0LjY5OTIxOSAxNS42OTkyMTkgMjUuMTk5MjE5IEMgMTUuNjk5MjE5IDI1LjY5OTIxOSAxNS4zMDA3ODEgMjYgMTQuODAwNzgxIDI2IEMgMTQuMzAwNzgxIDI2IDEzLjgwMDc4MSAyNS42OTkyMTkgMTMuNjAxNTYzIDI1LjE5OTIxOSBMIDEyLjg5ODQzOCAyNS44OTg0MzggQyAxMy4zOTg0MzggMjYuNjk5MjE5IDE0IDI3IDE0Ljg5ODQzOCAyNyBDIDE2LjEwMTU2MyAyNyAxNi44OTg0MzggMjYuMTk5MjE5IDE2Ljg5ODQzOCAyNS4xMDE1NjMgQyAxNi44OTg0MzggMjQuMTk5MjE5IDE2LjUgMjMuODAwNzgxIDE1LjMwMDc4MSAyMy4zMDA3ODEgWiAiLz4KPC9nPgo8L3N2Zz4K`
        }}
        CARD_TYPES={{
          dinersclub: 'DINERS_CLUB'
        }}
      />
    </Container>
  ))
  .add('custom styling (container)', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        containerClassName="custom-container"
        containerStyle={{
          backgroundColor: 'gray',
          padding: '20px',
          fontSize: '30px'
        }}
      />
    </Container>
  ))
  .add('custom styling (field wrapper)', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        fieldClassName="custom-field"
        fieldStyle={{ padding: '20px', color: 'gray' }}
        invalidClassName="is-invalid-custom"
        invalidStyle={{ border: '3px solid red' }}
      />
    </Container>
  ))
  .add('custom styling (input)', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        inputClassName="custom-input"
        inputStyle={{ color: 'red' }}
      />
    </Container>
  ))
  .add('custom styling (danger text)', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        dangerTextClassName="custom-danger-text"
        dangerTextStyle={{ color: 'green' }}
        invalidStyle={{ border: '1px solid green' }}
      />
    </Container>
  ))
  .add('custom renderers', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
          <input
            {...props}
            onChange={handleCardCVCChange(e => console.log('cvc change', e))}
          />
        )}
        cardExpiryInputRenderer={({ handleCardExpiryChange, props }) => (
          <input
            {...props}
            onChange={handleCardExpiryChange(e =>
              console.log('expiry change', e)
            )}
          />
        )}
        cardNumberInputRenderer={({ handleCardNumberChange, props }) => (
          <input
            {...props}
            onChange={handleCardNumberChange(e =>
              console.log('number change', e)
            )}
          />
        )}
      />
    </Container>
  ))
  .add('custom text values', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        customTextLabels={{
          invalidCardNumber: 'El número de la tarjeta es inválido',
          expiryError: {
            invalidExpiryDate: 'La fecha de expiración es inválida',
            monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
            yearOutOfRange: 'El año de expiración no puede estar en el pasado',
            dateOutOfRange: 'La fecha de expiración no puede estar en el pasado'
          },
          invalidCvc: 'El código de seguridad es inválido',
          invalidZipCode: 'El código postal es inválido',
          cardNumberPlaceholder: 'Número de tarjeta',
          expiryPlaceholder: 'MM/AA',
          cvcPlaceholder: 'COD',
          zipPlaceholder: 'C.P.'
        }}
      />
    </Container>
  ));
