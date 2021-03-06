import React, {Component} from "react";

import List from "@material-ui/core/List/index";
import {SERVER_DOMAIN} from "../../config";
import axios from "axios";
import SongItem from "./SongItem";


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.getPlaylist = this.getPlaylist.bind(this);
    
    this.state = {
      songs: []
    };
  }
  
  componentDidMount() {
    this.getPlaylist();
    
    const refreshIntervalId = setInterval(this.getPlaylist, 5000);
    this.setState({
      refreshIntervalId: refreshIntervalId
    });
  }
  
  componentWillUnmount() {
    clearInterval(this.state.refreshIntervalId);
  }
  
  getPlaylist() {
    const placeId = this.props.placeId;
    if(!placeId)
      return;
    
    const url = SERVER_DOMAIN + "/place/playlist?placeId=" + placeId;
    axios.get(url).then((response) => {
      let songs = response.data.songs;
      songs = songs.filter(song => !!song.spotifySong.id);
      
      this.setState({
        songs: songs
      });
    });
  };
  
  scrollIntoView(id, highlighted) {
    if(!highlighted)
      return;
  
    const target = document.getElementById(id);
    // el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    target.parentNode.scrollTop = target.offsetTop;
    console.log(target, target.parentNode);
  }
  
  render() {
    const {songs} = this.state;
    const {currentSong} = this.props;
    
    return (
      <List dense style={{height: "70vh", overflow: "auto"}}>
        {songs.map((song, index) => {
          const highlighted = (currentSong && currentSong.spotifySong.id === song.spotifySong.id);
          return <SongItem song={song}
                           showButton={true}
                           type="playlist"
                           key={song.spotifySong.id + index}
                           highlighted={highlighted}
                           id={song.spotifySong.id}
                           onLoad={() => this.scrollIntoView(song.spotifySong.id, highlighted)}/>
        })}
        
      </List>
    );
  }
}

export default Playlist;