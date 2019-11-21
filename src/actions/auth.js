import firebase from "../Firebase/firebase";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

const requestLogin = () => {
    return {
      type: LOGIN_REQUEST
    };
  };
  
  const signupSuccess = () => {
    return {
      type: SIGNUP_SUCCESS
    };
  };

  const receiveLogin = user => {
    return {
      type: LOGIN_SUCCESS,
      user
    };
  };
  
  const loginError = () => {
    return {
      type: LOGIN_FAILURE
    };
  };
  
  const resetPassword = () => {
    return {
      type: RESET_PASSWORD
    };
  };

  const requestLogout = () => {
    return {
      type: LOGOUT_REQUEST
    };
  };
  
  const receiveLogout = () => {
    return {
      type: LOGOUT_SUCCESS
    };
  };
  
  const logoutError = () => {
    return {
      type: LOGOUT_FAILURE
    };
  };
  
  const verifyRequest = () => {
    return {
      type: VERIFY_REQUEST
    };
  };
  
  const verifySuccess = () => {
    return {
      type: VERIFY_SUCCESS
    };
  };

  export const forgotUserPassword = (email) => dispatch => {
    dispatch(requestLogin());
    firebase.auth().sendPasswordResetEmail(email)
    .then(user => {
      dispatch(resetPassword(user));
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(loginError());
    });
  }
  
  export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(receiveLogin(user));
      })
      .catch(error => {
        //Do something with the error if you want!
        dispatch(loginError());
      });
  };
  
  export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(receiveLogout());
      })
      .catch(error => {
        //Do something with the error if you want!
        dispatch(logoutError());
      });
  };
  
  export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess());
    });
  };

  export const signupNewUser = (name, email, password) => dispatch => {
  //export const signupNewUser = (name, email, password) => dispatch => {
    
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    // .then( () => {
    //   alert('success')
    //   //alert(user);
    // })
    // .catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   alert(email)
    //   alert(errorCode + "error")
    //   alert(errorMessage)
    //   // ...
    // });

    dispatch(verifyRequest());
    //evt.preventDefault();
    //alert(`Submitting Name ${firstName}`)
    var user = null;
    //nullify empty arguments
    // for (var i = 0; i < arguments.length; i++) {
    //     arguments[i] = arguments[i] ? arguments[i] : null;
    // }

    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      alert(user)
    })
    .then(function () {
      alert('hello ' + name +" "+ email +" "+ password) 

        user = firebase.auth().currentUser;
        user.sendEmailVerification();
        alert(JSON.stringify(user))
    })
    .then(function () {
        user.updateProfile({
        displayName: name,
        //photoURL: photoURL
        });
        dispatch (signupSuccess());
    })
    .catch(function(error) {
        console.log(error.message);
        dispatch(loginError());
    });
    // console.log('Validation link was sent to ' + email + '.');
      
}
