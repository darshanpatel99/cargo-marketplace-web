import React, {useState, useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Search from "@material-ui/icons/Search";

import Grid from '@material-ui/core/Grid';

// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionProductCard from "./Sections/SectionProductCard.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import { connect, useSelector, useDispatch } from "react-redux";
import {logoutUser} from '../../actions'
import {getProducts} from '../../actions/getProducts'


import ProductsGrid from "views/Home/ProductsGrid.js"

//importing firebase
import firebase from "../../Firebase/firebase";
const useStyles = makeStyles(styles);

function Components(props) {

  const classes = useStyles();

  const handleLogout = () => {
    const { dispatch } = props;
    dispatch(logoutUser());
  }
  const [isLoading, setIsLoading] = useState(true);   //react hook for loading
  const [items, setItems] = useState([]) //react hook fot the list of items
  //const firebaseProductsRef = firebase.firestore().collection('Products').where('Status', '==', 'active');

  //useEffect==>component did mount
  useEffect(()=>{
    //creating the listener that will listen to the new changes to the product collection
    console.log('useEffect');
 
    //The returned function will behave as componentwillunmount
    return ()=> {}

  }, []);//second parameter is empty list so, it will only be called when first time the whole functional component mounted

  //useEffect==>component willunmount
//   useEffect(()=>{
//   return () => {
//     console.log('will unmount');
//     unsubscribe();
// }
// }, []);


// const Main = () => {
//   const getProductsSelector = useSelector((state) => state.posts)
//   const dispatch = useDispatch();
//   const getProductsAction = () => dispatch(getProducts());
//   useEffect(() => {
//     getProductsAction();
//   }, [])
// }

//Main();

  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="CarGo"
        rightLinks={
        <HeaderLinks />}
        fixed
        color="transparent"
        // centerLinks= {<div> <CustomInput
        //     white
        //     inputRootCustomClasses={classes.inputRootCustomClasses}
        //     formControlProps={{
        //       className: classes.formControl
        //     }}
        //     inputProps={{
        //       placeholder: "Search",
        //       inputProps: {
        //         "aria-label": "Search",
        //         className: classes.searchInput
        //       }
        //     }}
        //   />

        //   <Button justIcon round color="white">
        //     <Search className={classes.searchIcon} />
        //   </Button>
        //   </div>}
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/back.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Why Shop Caddy?</h1>
                <h3 className={classes.subtitle}>
                  Because every second matters! Think about it, HOW MUCH IS YOUR TIME WORTH?? We believe that your time is too valuable to deal with the headaches of trying to buy and sell with strangers online, so let ShopCaddy handle it!
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>

      </Parallax>
      <ProductsGrid/>

      <Footer />
    </div>
  );

}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Components);
