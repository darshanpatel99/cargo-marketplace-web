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

function GetStepContent(step) {
  //Hooks for post product first
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

  switch (step) {
    case 0:
      return (
        <PostProductFirst
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

export default function PostProduct() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
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
            {activeStep === steps.length ? (
              console.log("Final page")
            ) : (
              /* (
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
            ) */
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
                    {activeStep === steps.length ? "Post Now" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
