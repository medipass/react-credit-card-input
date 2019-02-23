# React Credit Card Input

> A credit/debit card input field for React

## Example

[Click here for an interactive demo](https://medipass.github.io/react-credit-card-input)

![](./example.gif)


## Install

```
$ npm install --save react-credit-card-input styled-components
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
  <tr><td>  cardNumberInputProps </td><td>object (optional)</td><td>{}</td> <td>Card number input element props<br/>(e.g. { value: cardNumber, onChange: this.handleCardNumberChange, onBlur: this.handleCardNumberBlur, onError: this.handleCardNumberError })</td></tr>
  <tr><td>  cardExpiryInputProps </td><td>object (optional)</td><td>{}</td> <td>Card expiry date input element props<br/>(e.g. { value: expiry, onChange: this.handleCardExpiryChange, onBlur: this.handleCardExpiryBlur, onError: this.handleCardExpiryError })</td></tr>
  <tr><td>  cardCVCInputProps </td><td>object (optional)</td><td>{}</td> <td>Card CVC input element props<br/>(e.g. { value: cvc, onChange: this.handleCardCVCChange, onBlur: this.handleCardCVCBlur, onError: this.handleCardCVCError })</td></tr>
  <tr><td>  cardNumberInputRenderer </td><td>Function (view input renderer props below)</td><td></td> <td>Card number input renderer</td></tr>
  <tr><td>  cardExpiryInputRenderer </td><td>Function (view input renderer props below)</td><td></td> <td>Card expiry date input renderer</td></tr>
  <tr><td>  cardCVCInputRenderer </td><td>Function (view input renderer props below)</td><td></td> <td>Card CVC input renderer</tr>
  <tr><td>  onError </td><td>Function (optional)</td><td></td> <td>Invokes on field errors. Recieves errorMessage argument.</tr>
  <tr><td colspan="4"></tr>
  <tr><td>  cardImageClassName </td><td>string (optional)</td><td>''</td> <td>Class name for the card type image</td></tr>
  <tr><td>  cardImageStyle </td><td>object (optional)</td><td>{}</td> <td>Style for the card type image</td></tr>
  <tr><td>  containerClassName </td><td>string (optional)</td><td>''</td> <td>Class name for the field container</td></tr>
  <tr><td>  containerStyle </td><td>object (optional)</td><td>{}</td> <td>Style for the field container</td></tr>
  <tr><td>  dangerTextClassName </td><td>string (optional)</td><td>''</td> <td>Class name for the danger text</td></tr>
  <tr><td>  dangerTextStyle </td><td>object (optional)</td><td>{}</td> <td>Style for the danger text container</td></tr>
  <tr><td>  fieldClassName </td><td>string (optional)</td><td>''</td> <td>Class name for the field</td></tr>
  <tr><td>  fieldStyle </td><td>object (optional)</td><td>{}</td> <td>Style for the field</td></tr>
  <tr><td>  inputClassName </td><td>string (optional)</td><td>''</td> <td>Class name for the inputs</td></tr>
  <tr><td>  inputStyle </td><td>object (optional)</td><td>{}</td> <td>Style for the inputs</td></tr>
  <tr><td>  invalidClassName </td><td>string (optional)</td><td>'is-invalid'</td> <td>Class name for the invalid field</td></tr>
  <tr><td>  invalidStyle </td><td>object (optional)</td><td>{}</td> <td>Style for the invalid field</td></tr>
  <tr><td colspan="4"></tr>
  <tr><td>  inputComponent </td><td>string, function, class (optional)</td><td>'input'</td> <td>Input component for the card number, expiry and CVC input</td></tr>
  <tr><td colspan="4"></tr>
  <tr><td>  customTextLabels </td><td>object (optional)</td><td>{}</td> <td>Object that defines custom label values.</td></tr>
</tbody>
</table>

### Input renderer props

<table>
<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
<tbody>
  <tr><td>  handleCardNumberChange </td><td>Function</td> <td>Handle card number change.</td></tr>
  <tr><td>  handleCardNumberBlur </td><td>Function</td> <td>Handle card number blur.</td></tr>
  <tr><td>  handleCardExpiryChange </td><td>Function</td> <td>Handle card expiry change.</td></tr>
  <tr><td>  handleCardExpiryBlur </td><td>Function</td> <td>Handle card expiry blur.</td></tr>
  <tr><td>  handleCardCVCChange </td><td>Function</td> <td>Handle card CVC change.</td></tr>
  <tr><td>  handleCardCVCBlur </td><td>Function</td> <td>Handle card CVC blur.</td></tr>
  <tr><td>  props </td><td>Object</td> <td>Input component props</td></tr>
</tbody>
</table>

#### Error handling

```jsx
<CreditCardInput
  onError={({ inputName, err }) => console.log(`credit card input error: ${err}`)}
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
/>
```

#### Custom input renderer usage

```jsx
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
```

#### Custom text labels usage

```jsx
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
```

## Contributing

Contributing to `react-credit-card-input` is easy! With four simple steps:

### Create a branch

1. Fork the repository
1. `git clone <your-repo-url>` to clone your GitHub repo to your local one
1. `git pull origin master` to pull the latest code
1. `npm install` to install the project's dependencies
1. `git checkout -b the-name-of-my-branch` to create a branch (use something short and comprehensible, such as: `fix-card-number-issue`).
1. `git remote add upstream https://github.com/medipass/react-credit-card-input.git` and `git pull upstream master` to update your fork from this source.

### Make the change

Note: You can run `npm run storybook`, and then navigate to http://localhost:9001/ to interactively develop your changes. If you are developing a new feature, make sure to add a story for it!

### Test the change
1. Run `npm run fix` from the project root (This will run Prettier and ESLint and automatically fix any issues).

### Push the change!
1. `git add -A && git commit -m "My message (#issue-number/pr-number)"` (replacing `My message (#issue-number/pr-number)` with a commit message, such as `Fixed card number issue (#43)`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`

## License

MIT © [Medipass Solutions](https://medipass.com.au)
