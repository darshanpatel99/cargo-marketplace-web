import { PayPalButton } from "react-paypal-button-v2";
import React, {useState, useEffect} from 'react';
import firebase from '../../Firebase/firebase'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';


function Paypal(props) {

  //React Hooks using Use State
  const [paymentSuccessful, setPaymentSuccessful] =  useState(false);
  const [orderId, setOrderId] = useState("");

  function updateFirebase(){
    var productStatusReference = firebase.firestore().collection('Products').doc(props.item.key);
    // console.log("\n\n\n"+ this.state.userId +"\n"+ firebaseChat.userDisplayName + "\n" + this.state.BuyerAddress+ "\n" + this.state.DeliveryFee + "\n" + Math.round(this.props.charge))
    return productStatusReference.update({
      Status: 'bought',
      BuyerID: props.user.uid,
      BuyerName: props.user.displayName,
      BuyerAddress: props.address + props.city + props.zip + " Phone Number " + props.phonenumber,
      //DeliveryFee: this.state.DeliveryFee,
      TotalFee:  props.totalFee,
      BoughtStatus: 'true',
      OrderNumber:-1,
      OrderId:orderId,
    })
    // console.log('hello props ' + props.user.uid)
  }

  if(paymentSuccessful){
    return (<Redirect to={{ pathname: "/thankyou",
    state: { orderId:orderId }
  }}/>)  
  }

  
  
  return (
    <PayPalButton
      amount={props.totalFee}
      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"

      onSuccess={(details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);

        // OPTIONAL: Call your server to save the transaction
        // return fetch("/paypal-transaction-complete", {
        //   method: "post",
        //   body: JSON.stringify({
        //     orderId: data.orderID
        //   })
        // });
        console.log(JSON.stringify(data));
        setOrderId(data.orderID);
      
        updateFirebase();
        setPaymentSuccessful(true);

      }}
      options={{
        clientId: "AcBgoLpVx4aD3nSVmQ38hA4anYBQBw5bPMvaUIT5eSTZF4RZwHTllCV_Evgil96nlWhj-rZFCCPNk6mY"
        ,currency:"CAD"
      }}
    />
  );
  
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
    isResetEmailSent: state.auth.isResetEmailSent,
    user: state.auth.user,
    //pathName: state.from.pathname
  };
}

export default connect(mapStateToProps)(Paypal);