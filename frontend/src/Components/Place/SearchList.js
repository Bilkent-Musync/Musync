import React, {Component} from "react";

import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/index";
import IconButton from "@material-ui/core/IconButton/index";
import Typography from "@material-ui/core/Typography/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {SERVER_DOMAIN} from "../../config";


class SearchList extends Component {
  render() {
    const {songs, ids, playlistId} = this.props;

    return (
      <List dense>
        {renderPlaylist(songs, playlistId)}
      </List>
    );
  }
}

function renderPlaylist(songs, playlistId) {
  let counter = 0;
  return songs.map(song => {
    counter++;
    return renderSong(song, playlistId);
  });
}

function renderSong(song, playlistId) {
  const {id, name, artist, length} = song;

  return <ListItem key={id} disableGutters divider>
    <IconButton color="secondary"
    onClick={()=> console.log("Name: " + name + "Song ID: " + id + "Playlist ID: " + playlistId) }>
    <FontAwesomeIcon  icon="plus" size="xs"/>
    </IconButton>

    <ListItemText>
      <Typography variant="body2" align="left" >
        {artist + " - " + name + " · " + length}
      </Typography>
    </ListItemText>

  </ListItem>;
}

export default SearchList;
