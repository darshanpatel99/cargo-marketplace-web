
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


// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";

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
  const classes = useStyles();
  const [item, setItem] = useState(JSON.parse(props.location.state));
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setisOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)


  console.log("From Product detail ==>" + JSON.stringify(item.Name));

  const urls = item.Pictures; // varaible to store all the pcitures of that product
     //useEffect==>component did mount
     useEffect(()=>{
      //creating the listener that will listen to the new changes to the product collection
      console.log('useEffect in product detail screen');
      setIsLoading(false);

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

                <Grid container spacing={6} className={classNames(classes.productDetailsContainer)}>
                    <Grid item xs={6} >
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

                    <Grid item xs={6}>
                        <h1>{item.Name}</h1>
                        <p>{item.Description}</p>

                        <Link to={{pathname:'/checkout', state:safeStringify(item)}}>
                          <Button xs={6} color="primary">Buy</Button>
                        </Link>
                        <Button xs={6} color="primary">Chat</Button>

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
