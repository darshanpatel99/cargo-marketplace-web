import React, {useState, useEffect, Suspense, lazy} from "react"; //Suspence and lazy are for lazy loading in react
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


//core components
// import Button from "components/CustomButtons/Button.js";

// sections for this page
//import SectionProductCard from "./Sections/SectionProductCard.js";
import styles from "assets/jss/material-kit-react/views/components.js";

//importing React-Spinners
import {BeatLoader} from 'react-spinners';

//importing firebase
import firebase from "../../Firebase/firebase";
const useStyles = makeStyles(styles);
const SectionProductCard = lazy(() => import ("./Sections/SectionProductCard.js"))


export default function ProductsGrid(props){
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [newItems, setNewItems]= useState([]);
    const [limit, setLimit] = useState(1); //start from the 0 index
    const [oldLimit, setOldLimit] = useState(0);
    // const firebaseProductsRef = firebase.firestore().collection('Products').where('OrderNumber', '<', 0).orderBy("OrderNumber").startAt(startAt);
    // firebaseProductsRef.endAt(endAt);
    const chunk = 3; //number of products we want to get from firebase
    //useEffect==>component did mount
    useEffect(()=>{
      //creating the listener that will listen to the new changes to the product collection
      console.log('useEffect');
     const firebaseProductsRef = firebase.firestore().collection('Products').where('OrderNumber', '<', 0).orderBy("OrderNumber");//.limit(limit);
      // //firebaseProductsRef.endAt(endAt);
     const unsubscribe = firebaseProductsRef.onSnapshot(onCollectionUpdate);


      //return the listener to the Query Snapshot
      return ()=> unsubscribe()

    }, []);

    //useEffect --- to listen to the the number of products we are fetching from the firestore
    // useEffect(()=>{
    //   console.log("Limit changed");

    //   const firebaseProductsRef = firebase.firestore().collection('Products').where('OrderNumber', '<', 0).orderBy("OrderNumber")//.limit(limit);
    //   //firebaseProductsRef.endAt(endAt);
    //   const unsubscribe = firebaseProductsRef.onSnapshot(onCollectionUpdate);

    //   //return the listener to the Query Snapshot
    //   return ()=> unsubscribe()


    // }, [limit]);


    //Listent to the updates
     const onCollectionUpdate = (querySnapshot) =>{
       const products = [];
         querySnapshot.forEach((doc) => {
           const {  SellerName, AddressArray, Description, Name, Price, Thumbnail, Pictures, Category, Owner, BuyerID, Status, DeliveryProvider, DeliveryVehicle, SellerDeliveryPrice, Avability,SellerAddress, AdditionalData, } = doc.data();
             // console.log(typeof Pictures['0']);
           products.push({
             key: doc.id,
             doc,
             Name,
             Description,
             Owner,
             Price,
             Thumbnail,
             Pictures,
             Category,
             AddressArray,
             BuyerID,
             Status,
             SellerName,
             DeliveryProvider,
             DeliveryVehicle,
             SellerDeliveryPrice,
             Avability,
             SellerAddress,
             AdditionalData,
           });
          //  console.log("got new product");
          //  setItems(products);
          //  setIsLoading(false);
           
           
         });
         console.log("got new product");
         setItems(products);
         setIsLoading(false);
        //  var newProducts = [];
        //  console.log(products)
        //  //setItems(products)
        //  for(var k=0; k<products.length; k++){
        //    if(k>=oldLimit){
        //      newProducts.push(products[k]);
        //    }
        //  }
        //  setNewItems(newProducts);
        //  setIsLoading(false);
         //alert(products[0].Name);
         //Function Ends
     }


     //Load More Button Handler
     const handleLoadMore =() =>{
        //set the start at with number of products we want to laod more
       // setOldLimit(limit);
        //setLimit(limit+chunk);
        console.log("limiiimiit" + limit);
     }



     const { ...rest } = props;

     //When we got all the products
     if(isLoading==false){

       return(
         <div className={classNames(classes.main, classes.mainRaised)}>
           <Grid container spacing={3} className={classNames(classes.mainContainerGrid)}>

             {
               //for loop to iterate over each item and creating a carg for it.
               items.map((item, k)=>{
                return(
              <Grid item spacing={3}>
                <Suspense fallback={<CircularProgress />}>
                 <SectionProductCard xs={3} title={item.Name} description={item.Description} src={item.Thumbnail} alt="Product Image" product={item}/>
                </Suspense>
              </Grid>
              
               );

               })
             }
             {/* <Button
                  color="primary"
                  target="_blank"
                  round
                  onClick = {handleLoadMore}>
                Load More
              </Button> */}
           </Grid>
         </div>
     );
     }
     return (
         <div className={classNames(classes.main, classes.mainRaised)}>
     <BeatLoader
         sizeUnit={"px"}
         size={30}
         color={'#123abc'}
         loading={isLoading}
       />
         </div>
     );


}
