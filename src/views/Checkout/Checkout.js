import React,{useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
//import PaymentForm from './PaymentForm';
import CreditCard from './CreditCard';
import Review from './Review';
import safeStringify from "safe-json-stringify";
import { connect } from "react-redux";


import { handleCheckout } from '../../actions';


//actions to update user details using redux


import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import './../../App.css'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="www.cargomarketplace.ca">
        CarGo Marketplace
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(18),
    marginBottom: theme.spacing(18),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Review your order', 'Shipping address', 'Payment details' ];



function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [item, setItem] = useState(JSON.parse(props.location.state));

  //Shipping address hooks
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[address, setAddress] = useState('');
  const[city, setCity] = useState('');
  const[zip, setZip] = useState('');
  const[phonenumber, setPhonenumber] = useState('');
  const[totalFee, setTotalFee] = useState('');


  //Credit card hooks
  // const[ccNumber, setCCNumber]= useState('');
  // const[ccName, setCCName]= useState('');
  // const[ccDate, setCCDate]= useState('');
  // const[ccCVC, setCCCVC]= useState('');


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
          return(
          <Review 
            state= {safeStringify(item)}
            totalFee = {totalFee}
            setTotalFee ={setTotalFee}
          /> 
          )  
      case 1:
          return( 
          
              <AddressForm 
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                address={address}
                setAddress={setAddress}
                city={city}
                setCity={setCity}
                zip={zip}
                setZip={setZip}
                phonenumber={phonenumber}
                setPhonenumber= {setPhonenumber}
              />
            )
      case 2:
          return (
          <CreditCard 
            // ccNumber={ccNumber}
            // setCCNumber={setCCNumber}
            // ccName={ccName}
            // setCCName={setCCName}
            // ccDate={ccDate}
            // setCCDate={setCCDate}
            // ccCVC={ccCVC}
            // setCCCVC={setCCCVC}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            zip={zip}
            setZip={setZip}
            phonenumber= {phonenumber}
            setPhonenumber= {setPhonenumber}
            item={item}
            setItem = {setItem}
            totalFee = {totalFee}
            setTotalFee ={setTotalFee}
          />
            
            )
      default:
        throw new Error('Unknown step');
    }
  }
  const { ...rest } = props;

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
    {...rest}
  />

    <React.Fragment>

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
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
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
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
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    number: state
  }
}

export default connect(mapStateToProps, { handleCheckout })(Checkout);