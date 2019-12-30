import React, { useState, useEffect } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// import Button from "components/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import safeStringify from "safe-json-stringify";


import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function Cards(props) {
  const classes = useStyles();

  //creating the states to get the props
  const[item, setItem] = useState(props.product); //empty json array
  
   //useEffect==>component did mount
   useEffect(()=>{
    //creating the listener that will listen to the new changes to the product collection
    console.log('useEffect');

  }, []);

  //return the card component
  return (
    <Card style={{width: "20rem"}}>
    <Link to={{pathname:`/product/${item.key}`, state:safeStringify(item)}} >
    <img
      style={{height: "180px", width: "100%", display: "block"}}
      className={classes.imgCardTop}
      src={props.src}
      alt={props.alt}
    />
    </Link>
    <CardBody>
  <h4 className={classes.cardTitle}>{props.title} {props.product.Price}$</h4>
    <p>{props.description}</p>
    <Link to={{pathname:`/product/${item.key}`, state:safeStringify(item)}} >
      <Button color="primary">Buy</Button>, 
    </Link>
      {/* <Button color="primary">Chat</Button> */}
    </CardBody>
  </Card>
);
}