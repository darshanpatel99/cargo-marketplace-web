import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";


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
  const[item, setItem] = useState(props.item); //empty json array
  setItem(props.item);//setting the props we got from the
  return (
    <Card style={{width: "20rem"}}>
    <img
      style={{height: "180px", width: "100%", display: "block"}}
      className={classes.imgCardTop}
      src={props.src}
      alt={props.alt}
    />
    <CardBody>
    <h4 className={classes.cardTitle}>{props.title}</h4>
    <p>{props.description}</p>
    <Link to={'/product', item=item} >
      <Button color="primary">Buy</Button>, 
    </Link>
      <Button color="primary">Chat</Button>
    </CardBody>
  </Card>
);
}