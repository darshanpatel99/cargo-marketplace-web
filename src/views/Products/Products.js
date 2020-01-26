import React, {useState, useEffect} from 'react';


// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Parallax from "components/Parallax/Parallax.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionProductCard from "../Home/Sections/SectionProductCard.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import { connect } from "react-redux";
import {logoutUser} from '../../actions'
import ProductsGrid from "views/Home/ProductsGrid.js"

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
          fixed
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
        <div style={{marginTop:250, marginBottom:250}}>
        <ProductsGrid limit={10}/>
        </div>
        <Footer />

        </div>



    );



}

// function mapStateToProps(state) {
//     return {
//       isLoggingOut: state.auth.isLoggingOut,
//       logoutError: state.auth.logoutError,
//       user: state.auth.user
//     };
//   }

//   export default connect(mapStateToProps)(Components);