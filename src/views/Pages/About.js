
import React, {useState, useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
//import Lightbox from "react-image-lightbox";
import './../../App.css';

//importing firebase
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
// import Button from "components/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/components.js";




export default function Components(props) {

    const useStyles = makeStyles(styles);
    const classes = useStyles();

      return (
        <div>
          <Header
            brand="CarGo"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 400,
              color: "white"
            }}
          />
          
        <div className={classes.container}>
            <div className={classes.pageContainer} >

            <h2>Who Are We?</h2>
            <p>We are a one-stop furniture shop for buying and selling your items online. No more organizing meetups with strangers. No more fumbling with e-transfers or cash. No more awkward sales.</p>

            <h2>Why Shop Caddy?</h2>
            <p>Because every second matters! Think about it, HOW MUCH IS YOUR TIME WORTH?? We believe that your time is too valuable to deal with the headaches of trying to buy and sell with strangers online, so let Shop Caddy handle it!</p>

            <p>Post your items for sale and get paid. Buy items and have them show up at your door. Start shopping stress-free with Shop Caddy, because your time is worth it.</p>

            </div>
        </div>

            </div>

    );   
}
