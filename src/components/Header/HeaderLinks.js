/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { connect } from "react-redux";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps } from "@material-ui/icons";
import AndroidOutlinedIcon from '@material-ui/icons/AndroidOutlined';
import AppleIcon from '@material-ui/icons/Apple';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import {logoutUser} from '../../actions'

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);


let isLoggedIn= false;

function HeaderLinks(props) {
  const classes = useStyles();
  const currentUserObject = props.user;
  if( Object.keys(currentUserObject).length > 0 ){
    console.log('user logged in');
    isLoggedIn = true;
  } else {
    console.log('user logged out')
    isLoggedIn= false;
  }


  const handleLogout = () => {
    const { dispatch } = props;
    dispatch(logoutUser());
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Filters"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="http://app.cargomarketplace.ca"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <AndroidOutlinedIcon className={classes.icons} />
          <AppleIcon className={classes.icons} /> Download App
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Link to={"/post"} className={classes.link}>

        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
        <AddAPhotoIcon className={classes.icons}/>
         Sell
        </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
      
        <Link to={"/signin"} className={classes.link}>
          {isLoggedIn ? (

            <Button
            color="primary"
            target="_blank"
            round
            onClick = {handleLogout}
          > Logout
          </Button>

          ) : (
            <Button
            color="primary"
            target="_blank"
            round
          > Login
          </Button>

            )}
        </Link>
      
      </ListItem>

    </List>
  );
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user,
    isLoggingIn: state.auth.isLoggingIn,
  };
}

export default connect(mapStateToProps)(HeaderLinks);