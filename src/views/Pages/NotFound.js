
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

                <h2 style={{textAlign: 'center', marginTop: 20}}>Sorry! We can’t find the page you’re looking for. Can we help you find your dream furniture instead?</h2>

            </div>
        </div>

            </div>

    );   
}
