// @flow

import React, { Component } from 'react';
import payment from 'payment';
import creditCardType from 'credit-card-type';
import styled from 'styled-components';

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
  cardNumber: string,
  errorText: ?string
};

class CreditCardInput extends Component<Props, State> {
  cardExpiryField: any;
  cardNumberField: any;
  cvcField: any;

  static defaultProps = {
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
      cardNumber: props.cardNumberInputProps.value,
      errorText: null
    };
  }

  componentDidMount = () => {
    const { cardNumber } = this.state;
    const cardType = payment.fns.cardType(cardNumber);
    this.setState({
      cardImage: images[cardType] || images.placeholder
    });
  };

  handleCardNumberBlur = (e: SyntheticInputEvent<*>) => {
    if (!payment.fns.validateCardNumber(e.target.value)) {
      this.setFieldInvalid('Card number is invalid');
    }

    const { cardNumberInputProps } = this.props;
    if (cardNumberInputProps.onBlur) {
      cardNumberInputProps.onBlur(e);
    }
  };

  handleCardNumberChange = (e: SyntheticInputEvent<*>) => {
    const cardNumber = e.target.value;
    const cardNumberLength = cardNumber.split(' ').join('').length;
    const cardType = payment.fns.cardType(cardNumber);
    const cardTypeInfo =
      creditCardType.getTypeInfo(creditCardType.types[CARD_TYPES[cardType]]) ||
      {};
    const cardTypeLengths = cardTypeInfo.lengths || [16];
    this.setState({
      cardImage: images[cardType] || images.placeholder,
      cardNumber
    });

    payment.formatCardNumber(document.getElementById('card-number'));

    this.setFieldValid();
    if (cardTypeLengths) {
      const lastCardTypeLength = cardTypeLengths[cardTypeLengths.length - 1];
      for (let length of cardTypeLengths) {
        if (
          length === cardNumberLength &&
          payment.fns.validateCardNumber(cardNumber)
        ) {
          this.cardExpiryField.focus();
          break;
        }
        if (cardNumberLength === lastCardTypeLength) {
          this.setFieldInvalid('Card number is invalid');
        }
      }
    }

    const { cardNumberInputProps } = this.props;
    if (cardNumberInputProps.onChange) {
      cardNumberInputProps.onChange(e);
    }
  };

  handleCardExpiryBlur = (e: SyntheticInputEvent<*>) => {
    const cardExpiry = e.target.value.split(' / ').join('/');
    const expiryError = isExpiryInvalid(cardExpiry);
    if (expiryError) {
      this.setFieldInvalid(expiryError);
    }

    const { cardExpiryInputProps } = this.props;
    if (cardExpiryInputProps.onBlur) {
      cardExpiryInputProps.onBlur(e);
    }
  };

  handleCardExpiryChange = (e: SyntheticInputEvent<*>) => {
    const cardExpiry = e.target.value.split(' / ').join('/');
    payment.formatCardExpiry(document.getElementById('card-expiry'));

    this.setFieldValid();

    const expiryError = isExpiryInvalid(cardExpiry);
    if (cardExpiry.length > 4) {
      if (expiryError) {
        this.setFieldInvalid(expiryError);
      } else {
        this.cvcField.focus();
      }
    }

    const { cardExpiryInputProps } = this.props;
    if (cardExpiryInputProps.onChange) {
      cardExpiryInputProps.onChange(e);
    }
  };

  handleCVCBlur = (e: SyntheticInputEvent<*>) => {
    if (!payment.fns.validateCardCVC(e.target.value)) {
      this.setFieldInvalid('CVC is invalid');
    }

    const { cardCVCInputProps } = this.props;
    if (cardCVCInputProps.onBlur) {
      cardCVCInputProps.onBlur(e);
    }
  };

  handleCVCChange = (e: SyntheticInputEvent<*>) => {
    const CVC = e.target.value;
    const CVCLength = CVC.length;
    payment.formatCardCVC(document.getElementById('cvc'));

    this.setFieldValid();
    if (CVCLength >= 4) {
      const cardType = payment.fns.cardType(this.state.cardNumber);
      if (!payment.fns.validateCardCVC(CVC, cardType)) {
        this.setFieldInvalid('CVC is invalid');
      }
    }

    const { cardCVCInputProps } = this.props;
    if (cardCVCInputProps.onChange) {
      cardCVCInputProps.onChange(e);
    }
  };

  handleKeyDown = (ref: any) => {
    return (e: SyntheticInputEvent<*>) => {
      if (e.keyCode === BACKSPACE_KEY_CODE && !e.target.value) {
        ref.focus();
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
      cardExpiryInputProps,
      cardNumberInputProps,
      cardCVCInputProps,
      cardImageClassName,
      cardImageStyle,
      containerClassName,
      containerStyle,
      dangerTextClassName,
      dangerTextStyle,
      fieldClassName,
      fieldStyle,
      inputComponent: Input,
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
            <Input
              id="card-number"
              ref={cardNumberField => {
                this.cardNumberField = cardNumberField;
              }}
              autoComplete="cc-number"
              className={`credit-card-input ${inputClassName}`}
              pattern="[0-9]*"
              placeholder="Card number"
              type="text"
              component="input"
              {...cardNumberInputProps}
              onBlur={this.handleCardNumberBlur}
              onChange={this.handleCardNumberChange}
            />
          </InputWrapper>
          <InputWrapper inputStyled={inputStyle} data-max="MM / YY 99">
            <Input
              id="card-expiry"
              ref={cardExpiryField => {
                this.cardExpiryField = cardExpiryField;
              }}
              autoComplete="cc-exp"
              className={`credit-card-input ${inputClassName}`}
              pattern="[0-9]*"
              placeholder="MM / YY"
              type="text"
              component="input"
              {...cardExpiryInputProps}
              onBlur={this.handleCardExpiryBlur}
              onChange={this.handleCardExpiryChange}
              onKeyDown={this.handleKeyDown(this.cardNumberField)}
            />
          </InputWrapper>
          <InputWrapper inputStyled={inputStyle} data-max="999999">
            <Input
              id="cvc"
              ref={cvcField => {
                this.cvcField = cvcField;
              }}
              autoComplete="cc-csc"
              className={`credit-card-input ${inputClassName}`}
              pattern="[0-9]*"
              placeholder="CVC"
              type="text"
              component="input"
              {...cardCVCInputProps}
              onBlur={this.handleCVCBlur}
              onChange={this.handleCVCChange}
              onKeyDown={this.handleKeyDown(this.cardExpiryField)}
            />
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
