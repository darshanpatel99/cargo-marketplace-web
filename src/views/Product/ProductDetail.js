
import React, {useState, useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
//import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox"
import './../../App.css';

//importing firebase
import firebase from "../../Firebase/firebase";

// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
// import Button from "components/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import {BeatLoader} from 'react-spinners';

//custom components from dependecies
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import safeStringify from "safe-json-stringify";


const useStyles = makeStyles(styles);

export default function Components(props) {
  const {match:{params}} = props;
  const classes = useStyles();
  console.log('Product Detail Screen');
  const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setisOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mobileDevice, setMobileDevice] = useState(window.innerWidth);
  
  if(props.location.state==null){
    console.log("The man who: "+ params.productId);
  }
  else{
  setItem(JSON.parse(props.location.state));
  }


  let layoutNumber = 6
  if(mobileDevice <= 570) {
    layoutNumber = 12;
  } else {
    layoutNumber =6
  }
  if(item==null){
    console.log("Object Empty")
  }

    //console.log("From Product detail ==>" + JSON.stringify(item.Name));

     const urls = item.Pictures; // varaible to store all the pcitures of that product
     //useEffect==>component did mount
     useEffect(()=>{
      //creating the listener that will listen to the new changes to the product collection
      console.log('useEffect in product detail screen: '+params.productId);

      var productId = params.productId;
    
      firebase.firestore().collection('Products').doc(productId).get().then((doc)=>{
        var data = doc.data();
        setItem(data);
        console.log(JSON.stringify(data));
        setIsLoading(false);
  
      }).catch((exception)=>{
        console.log('We get the following exception while fetching the product: '+ exception);
      });
  

      

      // setIsLoading(false);

    }, []);

  const { ...rest } = props;
  if(isLoading==false){
      return (
        <div>
          <Header
            brand="CarGo"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 400,
              color: "white"
            }}
            {...rest}
          />
          
            <div className={classes.container}>

                <Grid container spacing={layoutNumber} className={classNames(classes.productDetailsContainer)}>
                    <Grid item xs={layoutNumber} >
                        <Carousel autoPlay >
                                {
                                  urls.map((url, k)=>{
                                    return(
                                      <div onClick={() => setisOpen(true)}>
                                        <img src={url} />
                                      </div>
                                    );
                                  })
                                }
                          
                            </Carousel>
                    </Grid>

                    <Grid item xs={layoutNumber}>
                        <h1>{item.Name}</h1>
                        <p>{item.Description}</p>

                        <Link to={{pathname:'/checkout', state:safeStringify(item)}}>
                          <Button xs={layoutNumber} color="primary" type="button" fullWidth variant="contained" color="primary">Buy</Button>
                        </Link>
                        {/* <Button xs={layoutNumber} color="primary">Chat</Button> */}

                        <div><p>Delivery Rate: Delivery available by Shop Caddy.</p>
                              <p>Additional fees may apply. Delivery charge will be calculated during checkout process</p>
                              <p>Local pickup available from postal code V3H1G7.</p>
                        </div>
                    </Grid>
                </Grid>
            </div>


          <Footer />

          {isOpen && (
            <div>
              <Lightbox
                mainSrc={urls[photoIndex]}
                nextSrc={urls[(photoIndex + 1) % urls.length]}
                prevSrc={urls[(photoIndex + urls.length - 1) % urls.length]}
                onCloseRequest={() => setisOpen(false)}
                onMovePrevRequest={() =>
                  setPhotoIndex((photoIndex + urls.length - 1) % urls.length)
                }
                onMoveNextRequest={() =>
                  setPhotoIndex((photoIndex + urls.length + 1) % urls.length)
                }
              />
              </div>
            )}

        </div>
      );
      }
  
        return(
          
            <div>

            <Header
              brand="CarGo"
              rightLinks={<HeaderLinks />}
              fixed
              changeColorOnScroll={{
                height: 400,
                color: "white"
              }}
              {...rest}
            />
            
              <div className={classNames(classes.main)}>}
                  <BeatLoader
                  sizeUnit={"px"}
                  size={30}
                  color={'#123abc'}
                  loading={isLoading}
                />     
              </div>
            <Footer />
          </div>
    );   
}
