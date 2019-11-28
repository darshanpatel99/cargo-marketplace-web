import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  "Morning 7am to 12pm",
  "Afternoon 12pm to 5pm",
  "Evening 5pm to 10pm"
];

function getStyles(name, availabilty, theme) {
  return {
    fontWeight:
      availabilty.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function PostProductSecond() {
  const classes = useStyles();
  const theme = useTheme();
  const [deliverySwitch, setDeliverySwitch] = React.useState(false);
  const [availabilty, setAvailability] = React.useState([]);
  const [vehicle, setVehicle] = React.useState("truck");
  const [description, setDescription] = React.useState();
  const [deliveryPrice, setDeliveryPrice] = React.useState();
  const [pickupAddress, setPickupAddress] = React.useState();

  const handleChangePickupAddress = event => {
    setPickupAddress(event.target.value);
  };
  const handleChangeDeliveryPrice = event => {
    setDeliveryPrice(event.target.value);
  };
  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };
  const handleVehicleChange = event => {
    setVehicle(event.target.value);
  };

  const handleChangeDeliverySwitch = event => {
    setDeliverySwitch(event.target.checked);
  };

  const handleChangeAvailability = event => {
    setAvailability(event.target.value);
  };

  const displayDeliveryPrice = () => {
    if (deliverySwitch) {
      return (
        <TextField
          id="standard-number"
          label="Delivery Price"
          type="number"
          className={classes.priceField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          value={deliveryPrice}
          onChange={handleChangeDeliveryPrice}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Payment method
      </Typography> */}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows="4"
            //defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            value={description}
            onChange={handleChangeDescription}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            label="Do you want to deliver ?"
            labelPlacement="start"
            control={
              <Switch
                checked={deliverySwitch}
                onChange={handleChangeDeliverySwitch}
                value="checkedB"
                color="primary"
              />
            }
          />

          <Grid container>
            <Grid item xs={12} sm={6}>
              <h6>
                {deliverySwitch
                  ? "How much for delivery ?"
                  : "CarGo will take care of delivery!"}
              </h6>
            </Grid>
            <Grid item xs={12} sm={6}>
              {displayDeliveryPrice()}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">
              Delivery/Pickup Availability
            </InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={availabilty}
              onChange={handleChangeAvailability}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {names.map(name => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, availabilty, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl
            component="fieldset"
            className={classes.formVehicleControl}
          >
            <FormLabel component="legend">Does item fit in?</FormLabel>
            <RadioGroup
              defaultValue="truck"
              aria-label="vehicle"
              name="vehicle"
              value={vehicle}
              onChange={handleVehicleChange}
            >
              <FormControlLabel
                value="truck"
                control={<Radio />}
                label="Truck"
              />
              <FormControlLabel value="car" control={<Radio />} label="Car" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Pickup Address"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            value={pickupAddress}
            onChange={handleChangePickupAddress}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  priceField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  formVehicleControl: {
    margin: theme.spacing(3),
    width: "100%"
  }
}));
