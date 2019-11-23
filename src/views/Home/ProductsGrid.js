import React, {useState, useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';


// sections for this page
import SectionProductCard from "./Sections/SectionProductCard.js";
import styles from "assets/jss/material-kit-react/views/components.js";

//importing React-Spinners
import {BeatLoader} from 'react-spinners';

//importing firebase
import firebase from "../../Firebase/firebase";
const useStyles = makeStyles(styles);

export default function ProductsGrid(props){
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([])
    const firebaseProductsRef = firebase.firestore().collection('Products').where('Status', '==', 'active');

    //useEffect==>component did mount
    useEffect(()=>{
      //creating the listener that will listen to the new changes to the product collection
      console.log('useEffect');
      const unsubscribe = firebaseProductsRef.onSnapshot(onCollectionUpdate);

      //return the listener to the Query Snapshot
      return ()=> unsubscribe()

    }, []);


    //Listent to the updates
     const onCollectionUpdate = (querySnapshot) =>{
       console.log('Collection got an update');
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
         });

         setItems(products)
          setIsLoading(false);
         //alert(products[0].Name);
         //Function Ends
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
                 <SectionProductCard xs={3} title={item.Name} description={item.Description} src={item.Thumbnail} alt="Product Image" item={item}/>
              </Grid>
               );

               })
             }

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
