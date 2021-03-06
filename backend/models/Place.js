const assert = require('assert');

const ModelManager = require("./ModelManager");
const DBBasicTypes = require("./DBBasicTypes");
const ModelBase = require("./ModelBase");
const SpotifyConnection = require("./SpotifyConnection");
const Playlist = require("./Playlist");
const Location = require("./Location");
const Song = require("./Song");
const SongRecord = require("./SongRecord");

class Place extends ModelBase {
  _initialize() {
    this._id = new DBBasicTypes.DBObjectID(null);
    this.name = new DBBasicTypes.DBString("");
    this.spotifyConnection = new SpotifyConnection();
    this.pin = new DBBasicTypes.DBNumber(0, 0);
    this.votedSongs = new DBBasicTypes.DBArray([], Song);
    this.votes = new DBBasicTypes.DBArray([]);
    this.playlist = new Playlist();
    this.initialPoint =  new DBBasicTypes.DBNumber(200, 0);
    this.songRecords = new DBBasicTypes.DBArray([], SongRecord);
    this.owner = new DBBasicTypes.DBObjectID(null);
    this.location = new Location();
    this.isPermanent = new DBBasicTypes.DBBoolean(false);
    this.genres = new DBBasicTypes.DBArray([], DBBasicTypes.DBObjectID);
  }
  
  get publicInfo() {
    const currentlyPlaying = this.playlist.songs[this.playlist.currentSong];
    
    return {
      _id : this._id.value,
      name: this.name.value,
      isSpotifyConnected: !!this.spotifyConnection && !!this.spotifyConnection.accessToken,
      votedSongs: this.votedSongs.value,
      votes: this.votes.value,
      currentlyPlaying: currentlyPlaying && currentlyPlaying.name,
      songRecords: this.songRecords.value,
      location: this.location.value,
    };
  }

  get updateInformation() {
    return {
      time: 1000,
      method: "updatePlaylist",
    };
  }
  
  static get collection() {
    return "place";
  }
}

module.exports = Place;