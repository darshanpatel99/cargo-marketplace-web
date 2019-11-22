import React, { useCallback, useState, Fragment   } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader';//https://react-dropzone-uploader.js.org/docs/quick-start


const fileStatuses = [
  'UploadFailed',
  'Initial',
  'Selected',
  'Uploading',
  'Uploaded',
  'RemoveFailed',
  'Removing'
];

export default function PostProductFirst() {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [category, setCategory] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [filePreviews, setFilePreviews] = React.useState({});

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeCategory = event => {
    setCategory(event.target.value);
  };
  const handleChangeCondition = event => {
    setCondition(event.target.value);
  };

  const MyUploader = () => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: ' ' } }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }
  
    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        
        inputContent="Images"
        accept="image/*"
      />
    )
  }
  

  return (
    <React.Fragment>

      <Grid container spacing={2}>

        <Grid item xs={12} container>
          <MyUploader />
        </Grid> 

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
            id="standard-number"
            type="number"
            label="Price"
            fullWidth
          />
        </Grid>

          <Grid item xs={12}>
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={category}
              onChange={handleChangeCategory}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>    
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
          </Grid>

        <Grid item xs={12}>
          <Typography variant="h9"  gutterBottom>
            Additional Information (Optional)
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="Brand"
            name="Brand"
            label="Brand Information"
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6} >
        <FormControl required className={classes.formControl}>
          <InputLabel id="demo-simple-select-required-label">Condition</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={condition}
              onChange={handleChangeCondition}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Good</MenuItem>
              <MenuItem value={20}>Better</MenuItem>
              <MenuItem value={30}>Fucked-Up</MenuItem>    
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
        <div className={classes.dimension}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Dimensions
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Dimensions</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Make sure your item is measured correctly (this is important as otherwise we can run into fit issues upon delivery).
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Height (in inches)"
                type="number"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Width (in inches)"
                type="number"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Depth (in inches)"
                type="number"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Reset
              </Button>
              <Button onClick={handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    height: '50px',
    width: '50px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dimension:{
    width:'100%',
  },
}));