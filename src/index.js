// @flow

import React, { Component } from 'react';
import payment from 'payment';
import creditCardType from 'credit-card-type';
import styled from 'styled-components';

import {
  formatExpiry,
  formatCardNumber,
  hasCardNumberReachedMaxLength,
  hasCVCReachedMaxLength,
  isHighlighted
} from './utils/formatter';
import images from './utils/images';
import isExpiryInvalid from './utils/is-expiry-invalid';

const Container = styled.div`
  display: inline-block;
  ${({ styled }) => ({ ...styled })};
`;
const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  ${({ styled }) => ({ ...styled })};

  &.is-invalid {
    border: 1px solid #ff3860;
    ${({ invalidStyled }) => ({ ...invalidStyled })};
  }
`;
const CardImage = styled.img`
  height: 1em;
  ${({ styled }) => ({ ...styled })};
`;
const InputWrapper = styled.label`
  position: relative;
  margin-left: 0.5em;
  display: flex;
  align-items: center;

  &::after {
    content: attr(data-max);
    visibility: hidden;
    height: 0;
  }

  & .credit-card-input {
    border: 0px;
    position: absolute;
    width: 100%;
    font-size: 1em;
    ${({ inputStyled }) => ({ ...inputStyled })};

    &:focus {
      outline: 0px;
    }
  }
`;
const DangerText = styled.p`
  font-size: 0.8rem;
  margin: 5px 0 0 0;
  color: #ff3860;
  ${({ styled }) => ({ ...styled })};
`;

const BACKSPACE_KEY_CODE = 8;
const CARD_TYPES = {
  mastercard: 'MASTERCARD',
  visa: 'VISA',
  amex: 'AMERICAN_EXPRESS'
};

type Props = {
  cardCVCInputRenderer: Function,
  cardExpiryInputRenderer: Function,
  cardNumberInputRenderer: Function,
  cardExpiryInputProps: Object,
  cardNumberInputProps: Object,
  cardCVCInputProps: Object,
  cardImageClassName: string,
  cardImageStyle: Object,
  containerClassName: string,
  containerStyle: Object,
  dangerTextClassName: string,
  dangerTextStyle: Object,
  fieldClassName: string,
  fieldStyle: Object,
  inputComponent: Function | Object | string,
  inputClassName: string,
  inputStyle: Object,
  invalidClassName: string,
  invalidStyle: Object
};
type State = {
  cardImage: string,
  cardNumberLength: number,
  cardNumber: ?string,
  errorText: ?string
};

const inputRenderer = ({ props }: Object) => <input {...props} />;

class CreditCardInput extends Component<Props, State> {
  cardExpiryField: any;
  cardNumberField: any;
  cvcField: any;

  static defaultProps = {
    cardCVCInputRenderer: inputRenderer,
    cardExpiryInputRenderer: inputRenderer,
    cardNumberInputRenderer: inputRenderer,
    cardExpiryInputProps: {},
    cardNumberInputProps: {},
    cardCVCInputProps: {},
    cardImageClassName: '',
    cardImageStyle: {},
    containerClassName: '',
    containerStyle: {},
    dangerTextClassName: '',
    dangerTextStyle: {},
    fieldClassName: '',
    fieldStyle: {},
    inputComponent: 'input',
    inputClassName: '',
    inputStyle: {},
    invalidClassName: 'is-invalid',
    invalidStyle: {}
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      cardImage: images.placeholder,
      cardNumberLength: 0,
      cardNumber: null,
      errorText: null
    };
  }

  componentDidMount = () => {
    this.setState({ cardNumber: this.cardNumberField.value }, () => {
      const cardType = payment.fns.cardType(this.state.cardNumber);
      this.setState({
        cardImage: images[cardType] || images.placeholder
      });
    });
  };

  checkIsNumeric = (e: any) => {
    if (!/^\d*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  handleCardNumberBlur = (
    { onBlur }: { onBlur?: ?Function } = { onBlur: null }
  ) => (e: SyntheticInputEvent<*>) => {
    if (!payment.fns.validateCardNumber(e.target.value)) {
      this.setFieldInvalid('Card number is invalid');
    }

    const { cardNumberInputProps } = this.props;
    cardNumberInputProps.onBlur && cardNumberInputProps.onBlur(e);
    onBlur && onBlur(e);
  };

  handleCardNumberChange = (
    { onChange }: { onChange?: ?Function } = { onChange: null }
  ) => (e: SyntheticInputEvent<*>) => {
    const cardNumber = e.target.value;
    const cardNumberLength = cardNumber.split(' ').join('').length;
    const cardType = payment.fns.cardType(cardNumber);
    const cardTypeInfo =
      creditCardType.getTypeInfo(creditCardType.types[CARD_TYPES[cardType]]) ||
      {};
    const cardTypeLengths = cardTypeInfo.lengths || [16];

    this.cardNumberField.value = formatCardNumber(cardNumber);

    this.setState({
      cardImage: images[cardType] || images.placeholder,
      cardNumber
    });

    this.setFieldValid();
    if (cardTypeLengths) {
      const lastCardTypeLength = cardTypeLengths[cardTypeLengths.length - 1];
      for (let length of cardTypeLengths) {
        if (
          length === cardNumberLength &&
          payment.fns.validateCardNumber(cardNumber)
        ) {
          if (this.cardExpiryField.getRenderedComponent) {
            this.cardExpiryField.getRenderedComponent().focus();
          } else {
            this.cardExpiryField.focus();
          }
          break;
        }
        if (cardNumberLength === lastCardTypeLength) {
          this.setFieldInvalid('Card number is invalid');
        }
      }
    }

    const { cardNumberInputProps } = this.props;
    cardNumberInputProps.onChange && cardNumberInputProps.onChange(e);
    onChange && onChange(e);
  };

  handleCardNumberKeyPress = (e: any) => {
    const value = e.target.value;
    this.checkIsNumeric(e);
    if (value && !isHighlighted()) {
      const valueLength = value.split(' ').join('').length;
      if (hasCardNumberReachedMaxLength(value, valueLength)) {
        e.preventDefault();
      }
    }
  };

  handleCardExpiryBlur = (
    { onBlur }: { onBlur?: ?Function } = { onBlur: null }
  ) => (e: SyntheticInputEvent<*>) => {
    const cardExpiry = e.target.value.split(' / ').join('/');
    const expiryError = isExpiryInvalid(cardExpiry);
    if (expiryError) {
      this.setFieldInvalid(expiryError);
    }

    const { cardExpiryInputProps } = this.props;
    cardExpiryInputProps.onBlur && cardExpiryInputProps.onBlur(e);
    onBlur && onBlur(e);
  };

  handleCardExpiryChange = (
    { onChange }: { onChange?: ?Function } = { onChange: null }
  ) => (e: SyntheticInputEvent<*>) => {
    const cardExpiry = e.target.value.split(' / ').join('/');

    this.cardExpiryField.value = formatExpiry(cardExpiry);

    this.setFieldValid();

    const expiryError = isExpiryInvalid(cardExpiry);
    if (cardExpiry.length > 4) {
      if (expiryError) {
        this.setFieldInvalid(expiryError);
      } else {
        if (this.cvcField.getRenderedComponent) {
          this.cvcField.getRenderedComponent().focus();
        } else {
          this.cvcField.focus();
        }
      }
    }

    const { cardExpiryInputProps } = this.props;
    cardExpiryInputProps.onChange && cardExpiryInputProps.onChange(e);
    onChange && onChange(e);
  };

  handleCardExpiryKeyPress = (e: any) => {
    const value = e.target.value;
    this.checkIsNumeric(e);
    if (value && !isHighlighted()) {
      const valueLength = value.split(' / ').join('').length;
      if (valueLength >= 4) {
        e.preventDefault();
      }
    }
  };

  handleCardCVCBlur = (
    { onBlur }: { onBlur?: ?Function } = { onBlur: null }
  ) => (e: SyntheticInputEvent<*>) => {
    if (!payment.fns.validateCardCVC(e.target.value)) {
      this.setFieldInvalid('CVC is invalid');
    }

    const { cardCVCInputProps } = this.props;
    cardCVCInputProps.onBlur && cardCVCInputProps.onBlur(e);
    onBlur && onBlur(e);
  };

  handleCardCVCChange = (
    { onChange }: { onChange?: ?Function } = { onChange: null }
  ) => (e: SyntheticInputEvent<*>) => {
    const CVC = e.target.value;
    const CVCLength = CVC.length;
    const cardType = payment.fns.cardType(this.state.cardNumber);

    this.setFieldValid();
    if (CVCLength >= 4) {
      if (!payment.fns.validateCardCVC(CVC, cardType)) {
        this.setFieldInvalid('CVC is invalid');
      }
    }

    const { cardCVCInputProps } = this.props;
    cardCVCInputProps.onChange && cardCVCInputProps.onChange(e);
    onChange && onChange(e);
  };

  handleCardCVCKeyPress = (e: any) => {
    const cardType = payment.fns.cardType(this.state.cardNumber);
    const value = e.target.value;
    this.checkIsNumeric(e);
    if (value && !isHighlighted()) {
      const valueLength = value.split(' / ').join('').length;
      if (hasCVCReachedMaxLength(cardType, valueLength)) {
        e.preventDefault();
      }
    }
  };

  handleKeyDown = (ref: any) => {
    return (e: SyntheticInputEvent<*>) => {
      if (e.keyCode === BACKSPACE_KEY_CODE && !e.target.value) {
        if (ref.getRenderedComponent) {
          ref.getRenderedComponent().focus();
        } else {
          ref.focus();
        }
      }
    };
  };

  setFieldInvalid = (errorText: string) => {
    const { invalidClassName } = this.props;
    // $FlowFixMe
    document.getElementById('field-wrapper').classList.add(invalidClassName);
    this.setState({ errorText });
  };

  setFieldValid = () => {
    const { invalidClassName } = this.props;
    // $FlowFixMe
    document.getElementById('field-wrapper').classList.remove(invalidClassName);
    this.setState({ errorText: null });
  };

  render = () => {
    const { cardImage, errorText } = this.state;
    const {
      cardImageClassName,
      cardImageStyle,
      cardCVCInputProps,
      cardExpiryInputProps,
      cardNumberInputProps,
      cardCVCInputRenderer,
      cardExpiryInputRenderer,
      cardNumberInputRenderer,
      containerClassName,
      containerStyle,
      dangerTextClassName,
      dangerTextStyle,
      fieldClassName,
      fieldStyle,
      inputClassName,
      inputStyle,
      invalidStyle
    } = this.props;
    return (
      <Container className={containerClassName} styled={containerStyle}>
        <FieldWrapper
          id="field-wrapper"
          className={fieldClassName}
          styled={fieldStyle}
          invalidStyled={invalidStyle}
        >
          <CardImage
            className={cardImageClassName}
            styled={cardImageStyle}
            src={cardImage}
          />
          <InputWrapper
            inputStyled={inputStyle}
            data-max="9999 9999 9999 9999 9999"
          >
            {cardNumberInputRenderer({
              handleCardNumberChange: onChange =>
                this.handleCardNumberChange({ onChange }),
              handleCardNumberBlur: onBlur =>
                this.handleCardNumberBlur({ onBlur }),
              props: {
                id: 'card-number',
                ref: cardNumberField => {
                  this.cardNumberField = cardNumberField;
                },
                autoComplete: 'cc-number',
                className: `credit-card-input ${inputClassName}`,
                pattern: `\d*`,
                placeholder: 'Card number',
                type: 'text',
                ...cardNumberInputProps,
                onBlur: this.handleCardNumberBlur(),
                onChange: this.handleCardNumberChange(),
                onKeyPress: this.handleCardNumberKeyPress
              }
            })}
          </InputWrapper>
          <InputWrapper inputStyled={inputStyle} data-max="MM / YY 9">
            {cardExpiryInputRenderer({
              handleCardExpiryChange: onChange =>
                this.handleCardExpiryChange({ onChange }),
              handleCardExpiryBlur: onBlur =>
                this.handleCardExpiryBlur({ onBlur }),
              props: {
                id: 'card-expiry',
                ref: cardExpiryField => {
                  this.cardExpiryField = cardExpiryField;
                },
                autoComplete: 'cc-exp',
                className: `credit-card-input ${inputClassName}`,
                pattern: `\d*`,
                placeholder: 'MM/YY',
                type: 'text',
                component: 'input',
                ...cardExpiryInputProps,
                onBlur: this.handleCardExpiryBlur(),
                onChange: this.handleCardExpiryChange(),
                onKeyDown: this.handleKeyDown(this.cardNumberField),
                onKeyPress: this.handleCardExpiryKeyPress
              }
            })}
          </InputWrapper>
          <InputWrapper inputStyled={inputStyle} data-max="99999">
            {cardCVCInputRenderer({
              handleCardCVCChange: onChange =>
                this.handleCardCVCChange({ onChange }),
              handleCardCVCBlur: onBlur => this.handleCardCVCBlur({ onBlur }),
              props: {
                id: 'cvc',
                ref: cvcField => {
                  this.cvcField = cvcField;
                },
                autoComplete: 'off',
                className: `credit-card-input ${inputClassName}`,
                pattern: `\d*`,
                placeholder: 'CVC',
                type: 'text',
                component: 'input',
                ...cardCVCInputProps,
                onBlur: this.handleCardCVCBlur(),
                onChange: this.handleCardCVCChange(),
                onKeyDown: this.handleKeyDown(this.cardExpiryField),
                onKeyPress: this.handleCardCVCKeyPress
              }
            })}
          </InputWrapper>
        </FieldWrapper>
        {errorText && (
          <DangerText className={dangerTextClassName} styled={dangerTextStyle}>
            {errorText}
          </DangerText>
        )}
      </Container>
    );
  };
}

export default CreditCardInput;
