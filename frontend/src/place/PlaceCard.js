import React, {Component} from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';


class PlaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {place, type} = this.props;
    const {id, name, image, genres, currentlyPlaying} = place;

    const isTypePrimary = (type === PlaceCardTypes.HomeViewPrimary);
    const isTypeSecondary = (type === PlaceCardTypes.HomeViewSecondary);
    const isTypePlaceView = (type === PlaceCardTypes.PlaceView);

    const showMedia = (isTypePrimary || isTypePlaceView);
    const imageHeight = isTypePrimary ? "auto" : 150;
    const showCardActions = (isTypePrimary || isTypeSecondary);

    return (
      <Grid item xs={12} key={id}>
        <Card square elevation={isTypePrimary ? 2 : 1}>
          {
            (showMedia && image) &&
            <CardMedia component="img"
                       alt={name + " image"}
                       height={imageHeight}
                       image={image}
                       title={name + " image"}
                       style={{objectFit:"cover"}}/>
          }

          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {name}
              <Typography inline style={{verticalAlign: "10%"}}>
                {" · " + genres.join(", ")}
              </Typography>
            </Typography>
            <Typography align="center" variant="body2">
              <FontAwesomeIcon icon="music"/>
              {" Now Playing: " + currentlyPlaying}
            </Typography>
          </CardContent>

          {
            showCardActions &&
            <CardActions style={{justifyContent: 'center'}}>
              <Button color="primary"
                      size="small"
                      variant={isTypePrimary ? "contained" : "text"}
                      onClick={this.handleClickOpen}>
                I am here!
              </Button>;
            </CardActions>
          }
        </Card>

        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                Enter the PIN Code of the Place
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label=""
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Join Place
              </Button>
            </DialogActions>
          </Dialog>
      </Grid>
    );
  }
}

export const PlaceCardTypes = {
  HomeViewPrimary: 1,
  HomeViewSecondary: 2,
  PlaceView: 3
};

export default PlaceCard;
