import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";



// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/components.js";

//custom components from dependecies
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const useStyles = makeStyles(styles);



export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;


  const images = [
    "https://picsum.photos/id/1015/1000/600/",
    "https://picsum.photos/id/1018/1000/600/",
    "https://picsum.photos/id/1015/1000/600/",

  ];

  const [isOpen, setisOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0)

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
                    <Carousel autoPlay>
                            <div onClick={() => setisOpen(true)}>
                                <img src={images[0]} />
                                <p className="legend">Legend 1</p>
                            </div>
                            <div onClick={() => setisOpen(true)}>
                                <img src={images[1]} />
                                <p className="legend">Legend 2</p>
                            </div>
                            <div onClick={() => setisOpen(true)}>
                                <img src={images[2]} />
                                <p className="legend">Legend 3</p>
                            </div>
                        </Carousel>
                </Grid>

                <Grid item xs={6}>
                    <h1>Lorem ipsum dolor sit amet, consectetur. </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus risus vel lectus accumsan porttitor sit amet ac turpis. Morbi tincidunt suscipit ante a porta. Suspendisse aliquet ante ac aliquet bibendum. Proin tristique dui et arcu molestie, eget commodo diam vestibulum. Nulla laoreet nibh at justo malesuada, nec placerat nulla rhoncus. Morbi egestas fermentum nisl ut fringilla. Ut tortor felis, tempus eu nisl nec, suscipit viverra velit.</p>

                    <Link to ="/checkout">
                      <Button xs={6} color="primary">Buy</Button>
                    </Link>
                    <Button xs={6} color="primary">Chat</Button>
                </Grid>
            </Grid>
        </div>

      <Footer />


      {isOpen && (
        <div>
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setisOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + images.length + 1) % images.length)
            }
          />
          </div>
        )}

    </div>
  );
}
