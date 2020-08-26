"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { PayPalButton } from "react-paypal-button-v2";
 
const PaypalRender = ({payment}) => {
    return (
      <PayPalButton
        amount="0.01"
        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        options={{
            clientId: "Aez4_T3ZVTLJHU56PuTmZQBKxn-_pInLCHcGrSrAA8hwvC04DUQ-mwTi3K8_6wV8maK7BHYyeExiP95c"
        }}
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          console.log(details, data);
        }}
      />
    );
}

PaypalRender.propTypes = {
    payment: PropTypes.object
  };

export default PaypalRender;