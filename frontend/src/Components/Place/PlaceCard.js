import React, {Component} from "react";
import axios from "axios";

import Button from "@material-ui/core/Button/index";
import Card from "@material-ui/core/Card/index";
import CardActions from "@material-ui/core/CardActions/index";
import CardMedia from "@material-ui/core/CardMedia/index";
import CardContent from "@material-ui/core/CardContent/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import Chip from "@material-ui/core/Chip";
import SongPlayer from "./SongPlayer";
import {GET_PLAYBACK_INFO_URL} from "../../config";


class PlaceCard extends Component {
  constructor(props){
    super(props);
    this.updateCurrentPlayingSong = this.updateCurrentPlayingSong.bind(this);

    this.state = {
      isPlaying: false,
      currentSong: null,
      currentSongStartTime: null,
    };
  }

  componentDidMount() {
    this.updateCurrentPlayingSong();
    this.time = setInterval(this.updateCurrentPlayingSong, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.time);
  }

  updateCurrentPlayingSong() {
    if(!this.props.place || !this.props.place._id)
      return;

    const url = GET_PLAYBACK_INFO_URL + "?placeId=" + this.props.place._id;
    axios.get(url)
      .then(response => {
        const {onCurrentSongChange} = this.props;
        if(typeof onCurrentSongChange === "function")
          onCurrentSongChange(response.data.currentSong);
        
        this.setState({
          ...response.data
        });
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  render() {
    const {place, type, isConnected} = this.props;
    const {name, image, genres} = place;
    const currentSong = this.state.currentSong;

    const isTypePrimary = (type === PlaceCardTypes.HomeViewPrimary);
    const isTypeSecondary = (type === PlaceCardTypes.HomeViewSecondary);
    const isTypePlaceView = (type === PlaceCardTypes.PlaceView);
    const isTypeAllPlaces = (type === PlaceCardTypes.AllPlaces);

    const showMedia = (isTypePrimary || isTypePlaceView || isTypeAllPlaces);
    const imageHeight = isTypePrimary ? "auto" : 150;
    const showCardActions = ((isTypePrimary || isTypeSecondary || !isConnected) && !isTypeAllPlaces);

    let {handleConnectPlace} = this.props;
    if(typeof handleConnectPlace !== "function")
      handleConnectPlace = () => { console.log("Undefined handleConnectPlace() be careful.") };

    const connectMessage = <Chip label={`Connect to ${name} to start requesting songs!`}
                                 color="primary"
                                 variant="outlined"
                                 style={{marginBottom: "3%"}}/>;

    return (
      <Grid item xs={12} md={10} lg={8} key={place._id}>
        <Card square elevation={isTypePrimary ? 2 : 1} >
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
            <Typography variant="h5" align="center">
              {name}
            </Typography>
            <Typography variant="caption" align="center" gutterBottom>
              {genres.map(genre => capitalizeFirstLetter(genre)).join(", ")}
            </Typography>

            {
              currentSong &&
              <Typography align="center" variant="body2">
                <FontAwesomeIcon icon={["fab", "itunes-note"]} style={{marginRight: "5px"}}/>
                {currentSong.artistName[0] + " - " + currentSong.name}
              </Typography>
            }

            {isTypePlaceView && <SongPlayer {...this.state}/>}

          </CardContent>

          {
            showCardActions &&
            <CardActions style={{justifyContent: 'center'}}>
              <Button color="primary"
                      size="small"
                      variant={isTypePrimary ? "contained" : "text"}
                      onClick={() => handleConnectPlace(place._id, name)}>
                Connect!
              </Button>;
            </CardActions>
          }

          <Grid container justify="center">
            {(!isConnected && isTypePlaceView) && connectMessage}
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export const PlaceCardTypes = {
  HomeViewPrimary: 1,
  HomeViewSecondary: 2,
  PlaceView: 3,
  AllPlaces: 4
};

export default PlaceCard;


// Taken from here and changed a bit:
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
  let words = string.split(" ");
  words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(" ");
}