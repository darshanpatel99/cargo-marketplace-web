import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import PostProductFirst from "./PostProductFirst";
import PostProductSecond from "./PostProductSecond";
import firebase from "../../Firebase/firebase";
import { connect } from "react-redux";
import uuid from 'react-native-uuid';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="www.cargomarketplace.com/">
        CarGo Marketplace
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 15, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = [" ", " "];

function PostProduct(props) {



  const userObject = props.user;
  const [userName, setuserName] = useState('');
  const [userUid, setUid] = useState('');
  const [imageUrls, setImageUrls]=useState([]);
  const [countImage, setcountImage]=useState(0)

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  //Hooks for post product first
  const [blobs, setBlobs] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [depth, setDepth] = useState();
  const [brand, setBrand] = useState();

  //Hooks for post product second.
  const [deliverySwitch, setDeliverySwitch] = useState(false);
  const [availabilty, setAvailability] = useState([]);
  const [vehicle, setVehicle] = useState("truck");
  const [description, setDescription] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState();
  const [pickupAddress, setPickupAddress] = useState();

  const GetStepContent = (step) => {

    switch (step) {
      case 0:
        return (
          <PostProductFirst
            blobs = {blobs}
            setBlobs = {setBlobs}
            title={title}
            setTitle={setTitle}
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
            condition={condition}
            setCondition={setCondition}
            height={height}
            setHeight={setHeight}
            width={width}
            setWidth={setWidth}
            depth={depth}
            setDepth={setDepth}
            brand={brand}
            setBrand={setBrand}
          />
        );
      case 1:
        return (
          <PostProductSecond
            deliverySwitch={deliverySwitch}
            setDeliverySwitch={setDeliverySwitch}
            availabilty={availabilty}
            setAvailability={setAvailability}
            vehicle={vehicle}
            setVehicle={setVehicle}
            description={description}
            setDescription={setDescription}
            deliveryPrice={deliveryPrice}
            setDeliveryPrice={setDeliveryPrice}
            pickupAddress={pickupAddress}
            setPickupAddress={setPickupAddress}
          />
        );

      default:
        console.log("Default error from main post");
        throw new Error("Unknown step");
    }
  }



  //post the product
  const postTheProduct = async() => {
    setuserName(userObject.displayName);
    console.log("Those are blobs")
    console.log(blobs);
    setUid(userObject.uid)

    setcountImage(blobs.length)

    console.log("Size of blobs")
    console.log(countImage)


    blobs.forEach(async (blob,k)=>{
      await uploadImageToFirebase(blob).then((result)=>{
 
      }).catch(error =>{
        console.log(error)
      })
    })
    
    console.log(userObject.uid)

    //Fuction that adds product to the database.
    //var productCollectionReference = firebase.firestore().collection('Products');
    //firebase.storage().ref().child('image-test-super-new/').put(blobs[0])

    console.log('Product Posted');

    console.log("Here is data");


   // productCollectionReference.add(data);
    alert('Inside post product function');

  }

  const checkData = ()=>{
   if(blobs.length>0&&title!=""&&description!=""&&price!=""){
     postTheProduct();
   }
   else{
     alert("Finish all fileds")
   }
  }

  const uploadProduct = ()=>{
     var data = {
      Description:  description ,
      Name:  title ,
      Price: price,
      Pictures : imageUrls,
      Thumbnail : imageUrls[0],
      Owner: userObject.uid,
      Flag: true,
      FavouriteUsers: [],
      TimeStamp: null,
      UserClicks: [],
      Category: { category },
      Avability: { availabilty },
      Status: 'active',
      SellerAddress:pickupAddress,
      BuyerID: '',
      SellerName: userName,
      BuyerName: '',
      BuyerAddress: '',
      DeliveryFee: '',
      TotalFee: '',
      BoughtStatus: 'false',
      OrderNumber: -1,
    }

    var productCollectionReference = firebase.firestore().collection('Products');
    productCollectionReference.add(data);

    alert("Hoo ha!")
  }

  const uploadImageToFirebase = async(blob)=>{
    var uploadTask = firebase.storage().ref().child(uuid.v1()).put(blob);
     
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        imageUrls.push(downloadURL)
        console.log("Array size is " + imageUrls.length)
        if(imageUrls.length == blobs.length){
          console.log("Done")
          uploadProduct()
        }
      });
    });
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      //alert("Hoo ha!")
      { checkData() }
    }
    else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            CarGo Marketplace
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Post Ad
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep !== steps.length ? (
              <React.Fragment>
                {GetStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Post Now" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for Posting.
                </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order has
                    shipped.
                </Typography>
                </React.Fragment>

              )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
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

export default connect(mapStateToProps)(PostProduct)