import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser, forgotUserPassword } from "../../actions";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";


import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

//using react-firebase ui for google login
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";




const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FFA105"
  },
  form: {
    marginTop: 1
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  }
});

class SignIn extends Component {
  state = { email: "", password: "", isSignedIn: false  };



uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    
  ],
  callbacks: {
    signInSuccess: () => false,
  }
  
}

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  forgotPassword = () => {
    const { dispatch } = this.props;
    const { email } = this.state;

    dispatch(forgotUserPassword(email));
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    const { classes, loginError, isAuthenticated, isResetEmailSent, location } = this.props;
    var prevLocation='';
    if(location.state == undefined){
        prevLocation = '/'
    } else {
        prevLocation = location.state.from.pathname

    }
    if (isAuthenticated) {
      return <Redirect to={{pathname: prevLocation,
          state:this.props.location.state.item      
        }} />;
    } else {
      return (
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
          // {...rest}
        />
        <Container component="main" maxWidth="xs">

          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handlePasswordChange}
            />
            {loginError && (
              <Typography component="p" className={classes.errorText}>
                Incorrect email or password.
              </Typography>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>

          <div>Or</div>

      <div className="cargo-firebase-ui">

        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>



          </Paper>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="Email"
                label="email"
                type="email"
                id="email"
                onChange={this.handleEmailChange}
                />
          <Paper>

          <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.forgotPassword}
            >
              Reset Password
            </Button>

          </Paper>

          {isResetEmailSent && (
              <Typography component="p" className={classes.errorText}>
                We've sent an email to {this.state.email}. Click the link in the email to reset your password!
              </Typography>
            )}

        <Link to={"/signup"} className={classes.link}>
          <Button color="secondary" size="lg" simple>
          Don't have an account?
          </Button>
        </Link>


        
        </Container>
        <Footer />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
    isResetEmailSent: state.auth.isResetEmailSent,
    user: state.auth.user,
    //pathName: state.from.pathname
  };
}

export default withStyles(styles)(connect(mapStateToProps)(SignIn));