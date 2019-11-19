import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';

export default function PostProductFirst() {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Post Ad
      </Typography> */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Title"
            name="Title"
            label="Title"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Price"
            name="Price"
            label="Price"
            fullWidth
          />
        </Grid>

          <Grid item xs={12}>
            <CustomDropdown
              dropdownHeader="Category"
              buttonText="Select Category"
              
              buttonProps={{
                round: false,
                color: "info",
                hoverColor: "primary"
              }}
              dropdownList={[
                "New",
                {divider: true},
                "Ok",
                {divider: true},
                "Fucked up",
              ]}
            />
          </Grid>

        <Grid item xs={12}>
          <Typography variant="h9"  gutterBottom>
            Additional Information (Optional)
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Brand"
            name="Brand"
            label="Brand Information"
            fullWidth
            
          />
        </Grid>
        
        <Grid item xs={12} sm={6} >
        <CustomDropdown
          dropdown
          dropdownHeader="Condition"
          buttonText="Condition"
          buttonProps={{
            round: false,
            color: "info"
          }}
          dropdownList={[
            "New",
            {divider: true},
            "Ok",
            {divider: true},
            "Fucked up",
          ]}
        />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="dimension"
            name="dimension"
            label="Dimension"
            fullWidth
            
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: '15px',
  },
}));