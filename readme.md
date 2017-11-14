# React Credit Card Input

> A credit/debit card input field for React

## Example

[Click here for an interactive demo](https://medipass.github.io/react-credit-card-input)

![](./example.gif)


## Install

```
$ npm install --save react-credit-card-input
```


## Usage

```js
import CreditCardInput from 'react-credit-card-input';

<CreditCardInput
  cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
  cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
  cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
  fieldClassName="input"
/>
```

## Available props


<table>
<thead><tr><th>Prop</th><th>Type</th><th>Default value</th><th>Description</th></tr></thead>
<tbody>
  <tr><td>  cardNumberInputProps </td><td>object (optional)</td><td>{}</td> <td>Card number input element props<br/>(e.g. { value: cardNumber, onChange: this.handleCardNumberChange, onBlur: this.handleCardNumberBlur })</td></tr>
  <tr><td>  cardExpiryInputProps </td><td>object (optional)</td><td>{}</td> <td>Card expiry date input element props<br/>(e.g. { value: expiry, onChange: this.handleCardExpiryChange, onBlur: this.handleCardExpiryBlur })</td></tr>
  <tr><td>  cardCVCInputProps </td><td>object (optional)</td><td>{}</td> <td>Card CVC input element props<br/>(e.g. { value: cvc, onChange: this.handleCardCVCChange, onBlur: this.handleCardCVCBlur })</td></tr>
  <tr><td>  fieldClassName </td><td>string (optional)</td><td>''</td> <td>Class name for the field</td></tr>
</tbody>
</table>

## License

MIT © [jxom](https://medipass.com.au)
