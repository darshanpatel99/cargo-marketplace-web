import { PayPalButton } from "react-paypal-button-v2";
import React from 'react';

export default function Paypal() {
  
    return (
        <PayPalButton
          amount="0.01"
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);
  
            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderId: data.orderID
              })
            });
          }}
          options={{
            clientId: "AevAaqw4ZF7OTiJHSFhv11QAGpJHvnD7NegnLvnv1cHiFSRc-FNKUYqkeFIQ96N2jP8J6y7ilp22Rso6"
          }}
        />
      );
  
}