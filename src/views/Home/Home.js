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
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionProductCard from "./Sections/SectionProductCard.js";
import styles from "assets/jss/material-kit-react/views/components.js";

//importing firebase
import firebase from "../../Firebase/firebase";
const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);   //react hook for loading
  const [items, setItems] = useState([]) //react hook fot the list of items
  const firebaseProductsRef = firebase.firestore().collection('Products').where('Status', '==', 'active');

  //useEffect==>component did mount
  useEffect(()=>{
    //creating the listener that will listen to the new changes to the product collection
    console.log('useEffect');
    const unsubscribe = firebaseProductsRef.onSnapshot(onCollectionUpdate);

    //return the listener to the Query Snapshot
    return ()=> unsubscribe()

  }, []);//second parameter is empty list so, it will only be called when first time the whole functional component mounted

  //useEffect==>component willunmount
//   useEffect(()=>{
//   return () => {
//     console.log('will unmount');
//     unsubscribe();
// }
// }, []);



//Listent to the updates
 const onCollectionUpdate = (querySnapshot) =>{
   console.log('Collection got an update');
   const products = [];
     querySnapshot.forEach((doc) => {
       const {  SellerName, AddressArray, Description, Name, Price, Thumbnail, Pictures, Category, Owner, BuyerID, Status, DeliveryProvider, DeliveryVehicle, SellerDeliveryPrice, Avability,SellerAddress, AdditionalData, } = doc.data();
         // console.log(typeof Pictures['0']);
       products.push({
         key: doc.id,
         doc,
         Name,
         Description,
         Owner,
         Price,
         Thumbnail,
         Pictures,
         Category,
         AddressArray,
         BuyerID,
         Status,
         SellerName,
         DeliveryProvider,
         DeliveryVehicle,
         SellerDeliveryPrice,
         Avability,
         SellerAddress,
         AdditionalData,
       });
     });
     setIsLoading(false);
     setItems(products)


     //Function Ends
 }


  const { ...rest } = props;
  if(isLoading==true){
    return(
    <div>
      <Header
        brand="CarGo"
        rightLinks={
        <HeaderLinks />}
        fixed
        color="transparent"
        centerLinks= {<div> <CustomInput
            white
            inputRootCustomClasses={classes.inputRootCustomClasses}
            formControlProps={{
              className: classes.formControl
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search",
                className: classes.searchInput
              }
            }}
          />
          <Button justIcon round color="white">
            <Search className={classes.searchIcon} />
          </Button>
          </div>}
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
                <h1 className={classes.title}>Why CarGo Marketplace?</h1>
                <h3 className={classes.subtitle}>
                  Because every second matters! Think about it, HOW MUCH IS YOUR TIME WORTH?? We believe that your time is too valuable to deal with the headaches of trying to buy and sell with strangers online, so let CarGo handle it!
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>

      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
      <Grid container spacing={3} className={classNames(classes.mainContainerGrid)}>
        <Grid item spacing={3}>
          <SectionProductCard xs={3} title="First Item" description="item description" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" alt="Card image cap" />
        </Grid>
        <Grid item spacing={3}>
          <SectionProductCard xs={3} title="Second Item" description="item description" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" alt="Card image cap" />
        </Grid>
        <Grid item spacing={3}>
          <SectionProductCard xs={3} title="Third Item" description="item description" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" alt="Card image cap" />
        </Grid>
        <Grid item spacing={3}>
          <SectionProductCard xs={3} title="Third Item" description="item description" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" alt="Card image cap" />
        </Grid>
        <Link to={"/product"} className={classes.link}>
          <Button color="primary" size="lg" simple>
            Load More
          </Button>
        </Link>

      </Grid>
      </div>

      <Footer />
    </div>
  );
  }
  return (
    <div>
      <Header
        brand="CarGo"
        rightLinks={
        <HeaderLinks />}
        fixed
        color="transparent"
        centerLinks= {<div> <CustomInput
            white
            inputRootCustomClasses={classes.inputRootCustomClasses}
            formControlProps={{
              className: classes.formControl
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search",
                className: classes.searchInput
              }
            }}
          />
          <Button justIcon round color="white">
            <Search className={classes.searchIcon} />
          </Button>
          </div>}
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
                <h1 className={classes.title}>Why CarGo Marketplace?</h1>
                <h3 className={classes.subtitle}>
                  Because every second matters! Think about it, HOW MUCH IS YOUR TIME WORTH?? We believe that your time is too valuable to deal with the headaches of trying to buy and sell with strangers online, so let CarGo handle it!
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>

      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
      <Grid container spacing={3} className={classNames(classes.mainContainerGrid)}>
        <Grid item spacing={3}>
          <SectionProductCard xs={3} title="We got the data" description="item description" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" alt="Card image cap" />
        </Grid>
        <Grid item spacing={3}>
          <SectionProductCard xs={3} title="Second Item" description="item description" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" alt="Card image cap" />
        </Grid>
        <Grid item spacing={3}>
          <SectionProductCard xs={3} title="Third Item" description="item description" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" alt="Card image cap" />
        </Grid>
        <Grid item spacing={3}>
          <SectionProductCard xs={3} title="Third Item" description="item description" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" alt="Card image cap" />
        </Grid>
        <Link to={"/product"} className={classes.link}>
          <Button color="primary" size="lg" simple>
            Load More
          </Button>
        </Link>

      </Grid>
      </div>

      <Footer />
    </div>
  );

}
