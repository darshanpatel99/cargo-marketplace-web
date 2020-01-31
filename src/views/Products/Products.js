import React, {useState, useEffect} from 'react';


// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Grid from '@material-ui/core/Grid';



// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {FirestoreCollection} from 'react-firestore';

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionProductCard from "../Home/Sections/SectionProductCard.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import { connect } from "react-redux";
import {logoutUser} from '../../actions'

const useStyles = makeStyles(styles);

export default function Products(props){
    const classes = useStyles();

    const { ...rest } = props;
    return(
        <div>
        <Header
          brand="CarGo"
          rightLinks={
          <HeaderLinks />}
          color="transparent"
          centerLinks= {
          <div> 
            {/* <CustomInput
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
            </Button> */}
            </div>
            }
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />


<FirestoreCollection
        path="Products"
        // sort="publishedDate:desc,authorName"
        render={({ isLoading, data }) => {
          return isLoading ? (
            // <Loading />
            <p>Loading...</p>
          ) : (
            <div className="products-grid-wrapper">
              
              <Grid  container spacing={3} justify="center" direction="row" alignItems="center">

                {data.map(product => (

                    <SectionProductCard title={product.Name} description={product.Description} src={product.Thumbnail} alt="Product Image" product={product}/>
                  
                  
                ))}

              </Grid>
              
            </div>

          );
        }}
/>


        <Footer />

        </div>




    );



}
