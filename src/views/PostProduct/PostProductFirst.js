import React, { useCallback, useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader"; //https://react-dropzone-uploader.js.org/docs/quick-start
import Input from "@material-ui/core/Input";
import firebase from './../../Firebase/firebase'
import Resizer from 'react-image-file-resizer';
import ImageCompressor from './../../handlers/ImageCompressor'

const fileStatuses = [
  "UploadFailed",
  "Initial",
  "Selected",
  "Uploading",
  "Uploaded",
  "RemoveFailed",
  "Removing"
];

export default function PostProductFirst(props) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [filePreviews, setFilePreviews] = React.useState({});

  // const [title, setTitle] = React.useState("");
  // const [price, setPrice] = React.useState("");
  // const [category, setCategory] = React.useState("");
  // const [condition, setCondition] = React.useState("");
  // const [height, setHeight] = React.useState();
  // const [width, setWidth] = React.useState();
  // const [depth, setDepth] = React.useState();
  // const [brand, setBrand] = React.useState();

  const handleChangeBrand = event => {
    props.setBrand(event.target.value);
  };
  const handleChangePrice = event => {
    props.setPrice(event.target.value);
  };

  const handleChangeWidth = event => {
    props.setWidth(event.target.value);
  };

  const handleChangeDepth = event => {
    props.setDepth(event.target.value);
  };

  const handleChangeHeight = event => {
    props.setHeight(event.target.value);
  };

  const handleChangeTitle = event => {
    props.setTitle(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseReset = () => {
    props.setHeight(0);
    props.setWidth(0);
    props.setDepth(0);
  };

  const handleChangeCategory = event => {
    props.setCategory(event.target.value);
  };
  const handleChangeCondition = event => {
    props.setCondition(event.target.value);
  };

  const Standard = () => {
    const getUploadParams = () => {
      return { url: "https://httpbin.org/post" };
    };

    const handleChangeStatus = (files, status) => {
        if (status === 'headers_received') {
        console.log("Metas");
        console.log(files);
        uploadFunc(files);
         }   
        else if (status === 'aborted') {
          }
        }


    const uploadFunc = (file) => {
      var newBlobs = props.blobs;
      var width = file.meta.width;
      var height = file.meta.height;

      if(width!= undefined && height !=undefined){
        var isValid = width>300&&height>300;
        console.log(isValid)

        if (isValid){
            var isLandscape = width>height;
            console.log(isLandscape)

            if(isLandscape){
                
                var ratio = width/height;

                Resizer.imageFileResizer(
                  file.file,
                  300, // width
                  300/ratio, // height
                  'JPEG',
                  100,
                  0,
                  uri => {
                    newBlobs.push(uri);

                    props.setBlobs(newBlobs);
                      console.log(uri)
                  },
                  'blob'
                );
            }
            else{
                if(width == height){
                  Resizer.imageFileResizer(
                    file.file,
                    300, // width
                    300, // height
                    'JPEG',
                    100,
                    0,
                    uri => {
                      newBlobs.push(uri);

                      props.setBlobs(newBlobs);
                        console.log(uri)
                    },
                    'blob'
                  );
                }
                else{

                    var ratio = height/width

                    Resizer.imageFileResizer(
                      file.file,
                      300/ratio, // width
                      300, // height
                      'JPEG',
                      100,
                      0,
                      uri => {
                        newBlobs.push(uri);

                        props.setBlobs(newBlobs);
                          console.log(uri)
                      },
                      'blob'
                    );
                }
            }
        }
    }

     
     
      // var mystring = file.file;
      // var myblob = new Blob([mystring], {
      //     type: 'image/png'
      // });

     

      // newBlobs.push(myblob);

      // props.setBlobs(newBlobs);
      
      
    };

    

    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={6}
        multiple={true}
        canCancel={true}
        styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
      />
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <Standard />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Title"
            name="Title"
            label="Title"
            fullWidth
            value={props.title}
            onChange={handleChangeTitle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="standard-number"
            type="number"
            label="Price"
            fullWidth
            value={props.price}
            onChange={handleChangePrice}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={props.category}
              onChange={handleChangeCategory}
              className={classes.selectEmpty}
            >
              {/* <option value="" />
              <optgroup label="Beds">
                {beds.map(name => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Chairs">
                {chairs.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </optgroup> */}

              {Object.entries(categoryList).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h9" gutterBottom>
            Additional Information (Optional)
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="Brand"
            name="Brand"
            label="Brand Information"
            fullWidth
            value={props.brand}
            onChange={handleChangeBrand}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Condition
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-required"
              value={props.condition}
              onChange={handleChangeCondition}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>
                New : Product has not been unwrapped from the box
              </MenuItem>
              <MenuItem value={2}>
                Good : Minor blemishes that most people will not notice
              </MenuItem>
              <MenuItem value={3}>
                Satisfactory : Moderate wear and tear, but stil has many good
                years left
              </MenuItem>
              <MenuItem value={4}>
                Age-worn : Has lived a full life and has a "distressed" look
                with noticeable wear
              </MenuItem>
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
              className={classes.dimension}
            >
              Add Dimensions
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Dimensions</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Make sure your item is measured correctly (this is important
                  as otherwise we can run into fit issues upon delivery).
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Height (in inches)"
                  type="number"
                  fullWidth
                  value={props.height}
                  onChange={handleChangeHeight}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Width (in inches)"
                  type="number"
                  fullWidth
                  value={props.width}
                  onChange={handleChangeWidth}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Depth (in inches)"
                  type="number"
                  fullWidth
                  value={props.depth}
                  onChange={handleChangeDepth}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseReset} color="primary">
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
    height: "50px",
    width: "50px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  dimension: {
    width: "100%",
    textTransform: "none"
  }
}));

const colors = [
  "Morning 7am to 12pm",
  "Afternoon 12pm to 5pm",
  "Evening 5pm to 10pm"
];

const categoryList = {
  1: "Beds",
  10: "Chairs",
  21: "Decor",
  26: "Lighting",
  31: "Rugs",
  34: "Sofas",
  43: "Tables"
};

const beds = [
  "Cribs",
  "Daybeds",
  "Full beds",
  "Headboards",
  "King beds",
  "Loft & Bunk Beds",
  "Queen beds",
  "Twin Beds"
];

const chairs = [
  "Accent Chairs",
  "Armchairs",
  "Benches",
  "Chair and a Half",
  "Dining Chairs",
  "Nursing Chairs",
  "Office Chairs",
  "Ottomans and Footstools",
  "Recliners",
  "Stools"
];
