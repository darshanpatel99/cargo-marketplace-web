import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const [item, setItem] = useState(JSON.parse(props.state));
  var deliveryFee= 40.99;
  var ConvenienceFee = (item.Price * (0.05)).toFixed(2);
  var TotalFee = (parseFloat(item.Price) + parseFloat(deliveryFee) + parseFloat(ConvenienceFee)).toFixed(2);

  const products = [
    { name: item.Name, desc: item.Description, price: '$'+ item.Price },
    { name: 'Shipping', desc: '', price: '$'+ deliveryFee },
    { name: 'Convenience Fee (5%)', desc: '', price: '$'+ ConvenienceFee},
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${TotalFee}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}