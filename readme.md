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

| Prop                    | Type                                       | Default value | Description                     |
| ----------------------- | ------------------------------------------ | -- | ------------------------------------------ |
| cardNumberInputProps    | object (optional)                          | {} | Card number input element props            |
|                         |                                            |    | (e.g. `{ value: cardNumber, onChange: this.handleCardNumberChange, onBlur: this.handleCardNumberBlur, onError: this.handleCardNumberError }` ) |
| cardExpiryInputProps    | object (optional)                          | {} | Card expiry date input element props       |
|                         |                                            |    | (e.g. `{ value: expiry, onChange: this.handleCardExpiryChange, onBlur: this.handleCardExpiryBlur, onError: this.handleCardExpiryError }`) |
| cardCVCInputProps       | object (optional)                          | {} | Card CVC input element props               |
|                         |                                            |    | (e.g. `{ value: cvc, onChange: this.handleCardCVCChange, onBlur: this.handleCardCVCBlur, onError: this.handleCardCVCError }`) |
| cardNumberInputRenderer | Function (view input renderer props below) |    | Card number input renderer                 |
| cardExpiryInputRenderer | Function (view input renderer props below) |    | Card expiry date input renderer            |
| cardCVCInputRenderer    | Function (view input renderer props below) |    | Card CVC input renderer                    |
| onError                 | Function (optional)                        |    | Invokes on field errors. Recieves errorMessage argument. |
|                         |                                            |    |                                            |
| cardImageClassName      | string (optional)                          | '' | Class name for the card type image         |
| cardImageStyle          | object (optional)                          | {} | Style for the card type image              |
| containerClassName      | string (optional)                          | '' | Class name for the field container         |
| containerStyle          | object (optional)                          | {} | Style for the field container              |
| dangerTextClassName     | string (optional)                          | '' | Class name for the danger text             |
| dangerTextStyle         | object (optional)                          | {} | Style for the danger text container        |
| fieldClassName          | string (optional)                          | '' | Class name for the field                   |
| fieldStyle              | object (optional)                          | {} | Style for the field                        |
| inputClassName          | string (optional)                          | '' | Class name for the inputs                  |
| inputStyle              | object (optional)                          | {} | Style for the inputs                       |
| invalidClassName        | string (optional)                          | 'is-invalid' | Class name for the invalid field |
| invalidStyle            | object (optional)                          | {} | Style for the invalid field                |
|                         |                                            |    |                                            |
| inputComponent          | string, function, class (optional)         | 'input' | Input component for the card number, expiry and CVC input |
|                         |                                            |    |                                            |
| customTextLabels        | object (optional)                          | {} | Object that defines custom label values.   |

### Input renderer props

| Prop                   | Type     | Description                |
| ---------------------- | -------- | -------------------------- |
| handleCardNumberChange | Function | Handle card number change. |
| handleCardNumberBlur   | Function | Handle card number blur.   |
| handleCardExpiryChange | Function | Handle card expiry change. |
| handleCardExpiryBlur   | Function | Handle card expiry blur.   |
| handleCardCVCChange    | Function | Handle card CVC change.    |
| handleCardCVCBlur      | Function | Handle card CVC blur.      |
| props                  | Object   | Input component props      |

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
