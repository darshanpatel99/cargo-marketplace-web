import React from 'react'
import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils'
import Paypal from './Paypal'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}


export default function CreditCard(props) {

  const handleChangeNumber = event => {
    console.log("!!!", event.target.value);
    props.setCCNumber(event.target.value);
  };

  return (
  
        <Paypal />
  
)
}