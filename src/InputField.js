import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-svg';
import payment from 'payment';
import creditCardType from 'credit-card-type';
import styled from 'styled-components';

import placeholder from './assets/placeholder.svg';
import mastercard from './assets/mastercard.svg';
import visa from './assets/visa.svg';
import amex from './assets/amex.svg';

const Container = styled.div`
  display: inline-block;
`;
const CardImageWrapper = styled.div`
  & div {
    height: 1em;
  }
`;
const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  transition: box-shadow 150ms ease;

  &.is-invalid {
    border: 1px solid #ff3860;
  }
`;
const CardImage = styled(SVG)`
  height: 1em;
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
`;
const Input = styled.input`
  border: 0px;
  position: absolute;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: 0px;
  }
`;
const DangerText = styled.p`
  font-size: 0.8rem;
  margin: 5px 0 0 0;
  color: #ff3860;
`;

const BACKSPACE_KEY_CODE = 8;
const CARD_IMAGES = {
  visa,
  mastercard,
  amex
};
const CARD_TYPES = {
  mastercard: 'MASTERCARD',
  visa: 'VISA',
  amex: 'AMERICAN_EXPRESS'
};

export default class extends Component {
  static propTypes = {
    cardExpiryInputProps: PropTypes.object,
    cardNumberInputProps: PropTypes.object,
    cardCVCInputProps: PropTypes.object
  };

  static defaultProps = {
    cardExpiryInputProps: {},
    cardNumberInputProps: {},
    cardCVCInputProps: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      cardImage: placeholder,
      cardNumberLength: 0,
      cardNumber: props.cardNumberInputProps.value,
      errorText: null
    };
    this.handleCardNumberBlur = this.handleCardNumberBlur.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleCardExpiryBlur = this.handleCardExpiryBlur.bind(this);
    this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
    this.handleCVCBlur = this.handleCVCBlur.bind(this);
    this.handleCVCChange = this.handleCVCChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setFieldInvalid = this.setFieldInvalid.bind(this);
    this.setFieldValid = this.setFieldValid.bind(this);
  }

  componentDidMount() {
    const { cardNumber } = this.state;
    const cardType = payment.fns.cardType(cardNumber);
    this.setState({
      cardImage: CARD_IMAGES[cardType] || placeholder
    });
  }

  handleCardNumberBlur(e) {
    if (!payment.fns.validateCardNumber(e.target.value)) {
      this.setFieldInvalid('Card number is invalid');
    }

    const { cardNumberInputProps } = this.props;
    if (cardNumberInputProps.onBlur) {
      cardNumberInputProps.onBlur(e);
    }
  }

  handleCardNumberChange(e) {
    const cardNumber = e.target.value;
    const cardNumberLength = cardNumber.split(' ').join('').length;
    const cardType = payment.fns.cardType(cardNumber);
    const cardTypeInfo =
      creditCardType.getTypeInfo(creditCardType.types[CARD_TYPES[cardType]]) ||
      {};
    const cardTypeLengths = cardTypeInfo.lengths || [16];
    this.setState({
      cardImage: CARD_IMAGES[cardType] || placeholder,
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
          document.getElementById('card-expiry').focus();
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
  }

  handleCardExpiryBlur(e) {
    if (!payment.fns.validateCardExpiry(e.target.value)) {
      this.setFieldInvalid('Expiry date is invalid');
    }

    const { cardExpiryInputProps } = this.props;
    if (cardExpiryInputProps.onBlur) {
      cardExpiryInputProps.onBlur(e);
    }
  }

  handleCardExpiryChange(e) {
    const cardExpiry = e.target.value;
    const cardExpiryLength = cardExpiry.split(' / ').join('').length;
    payment.formatCardExpiry(document.getElementById('card-expiry'));

    this.setFieldValid();
    if (cardExpiryLength >= 4) {
      if (payment.fns.validateCardExpiry(cardExpiry)) {
        document.getElementById('cvc').focus();
      } else {
        this.setFieldInvalid('Expiry date is invalid');
      }
    }

    const { cardExpiryInputProps } = this.props;
    if (cardExpiryInputProps.onChange) {
      cardExpiryInputProps.onChange(e);
    }
  }

  handleCVCBlur(e) {
    if (!payment.fns.validateCardCVC(e.target.value)) {
      this.setFieldInvalid('CVC is invalid');
    }

    const { cardCVCInputProps } = this.props;
    if (cardCVCInputProps.onBlur) {
      cardCVCInputProps.onBlur(e);
    }
  }

  handleCVCChange(e) {
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
  }

  handleKeyDown(targetFocusId) {
    return e => {
      if (e.keyCode === BACKSPACE_KEY_CODE && !e.target.value) {
        document.getElementById(targetFocusId).focus();
      }
    };
  }

  setFieldInvalid(errorText) {
    document.getElementById('field-wrapper').classList.add('is-invalid');
    this.setState({ errorText });
  }

  setFieldValid(errorText) {
    document.getElementById('field-wrapper').classList.remove('is-invalid');
    this.setState({ errorText: null });
  }

  render() {
    const { cardImage, errorText } = this.state;
    const {
      cardExpiryInputProps,
      cardNumberInputProps,
      cardCVCInputProps
    } = this.props;
    return (
      <Container>
        <FieldWrapper id="field-wrapper">
          <CardImageWrapper>
            <CardImage path={cardImage} />
          </CardImageWrapper>
          <InputWrapper data-max="9999 9999 9999 9999 9999">
            <Input
              id="card-number"
              alwaysShowMask={false}
              className="input"
              pattern="[0-9]*"
              placeholder="Card number"
              type="text"
              {...cardNumberInputProps}
              onBlur={this.handleCardNumberBlur}
              onChange={this.handleCardNumberChange}
            />
          </InputWrapper>
          <InputWrapper data-max="MM / YY 99">
            <Input
              id="card-expiry"
              pattern="[0-9]*"
              placeholder="MM / YY"
              type="text"
              {...cardExpiryInputProps}
              onBlur={this.handleCardExpiryBlur}
              onChange={this.handleCardExpiryChange}
              onKeyDown={this.handleKeyDown('card-number')}
            />
          </InputWrapper>
          <InputWrapper data-max="999999">
            <Input
              id="cvc"
              pattern="[0-9]*"
              placeholder="CVC"
              type="text"
              {...cardCVCInputProps}
              onBlur={this.handleCVCBlur}
              onChange={this.handleCVCChange}
              onKeyDown={this.handleKeyDown('card-expiry')}
            />
          </InputWrapper>
        </FieldWrapper>
        {errorText && <DangerText>{errorText}</DangerText>}
      </Container>
    );
  }
}
