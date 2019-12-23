import React, {useState, useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";


export default function ThankYou(props) {


    const { ...rest } = props;

    const [orderId, setOrderId] = useState(props.location.state.orderId);
    console.log("Order Id in thank you is :  " + props.location.state.orderId);

    return(

        <div>
            <Header
                brand="CarGo"
                rightLinks={
                <HeaderLinks />}
                fixed
                color="transparent"

                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
                {...rest}
            />
            <p>Thank You So mcuh for shopping with Shop Caddy.<br/>
You will never get to know your order number but still because you are our customer the order Id is {orderId}</p>
        </div>

    );


}