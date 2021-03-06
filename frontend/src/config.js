export const SERVER_DOMAIN = "http://localhost:1234";
export const SPOTIFY_INFO = {
  clientID: '',
  scopes: 'user-library-modify ' +
    'playlist-read-private ' +
    'user-read-email ' +
    'playlist-modify-public ' +
    'playlist-modify-private ' +
    'user-library-read ' +
    'user-read-playback-state ' +
    'user-modify-playback-state ' +
    'user-top-read ' +
    'user-read-currently-playing',
};

export const USER_REGISTER_URL = SERVER_DOMAIN + "/user/register";
export const USER_LOGIN_URL = SERVER_DOMAIN + "/user/login";
export const USER_LOGOUT_URL = SERVER_DOMAIN + "/user/logout";
export const GET_USER_URL = SERVER_DOMAIN + "/user/";
export const GET_USER_PROFILE_URL = SERVER_DOMAIN + "/user/gethistory";
export const SPOTIFY_CALLBACK_URL = SERVER_DOMAIN + "/callback";
export const GET_PLACE_URL = SERVER_DOMAIN + "/place";
export const CREATE_PLACE_URL = SERVER_DOMAIN + "/place";
export const GET_NEAR_PLACES_URL = SERVER_DOMAIN + "/place/closest";
export const CONNECT_PLACE_URL = SERVER_DOMAIN + "/place/connect";
export const GET_GENRES_URL = SERVER_DOMAIN + "/genres";
export const VOTE_URL = SERVER_DOMAIN +  "/place/voteforsong";
export const GET_VOTING_STATUS_URL = SERVER_DOMAIN + "/place/votestatus";
export const CONNECT_SPOTIFY_URL = SERVER_DOMAIN + "/user/connectspotify";
export const GET_PLAYLISTS_URL = SERVER_DOMAIN + "/user/playlists";
export const GET_PLAYBACK_INFO_URL = SERVER_DOMAIN + "/place/playback";
export const MAP_API_KEY = "";
export const GET_RECOMMENDED_PLACES = SERVER_DOMAIN +"/user/recommendedplaces";


export function generateSpotifyAuthURL(stateParam) {
  const {protocol, host} = window.location;
  let url = "https://accounts.spotify.com/authorize?";
  let options = {
    client_id: SPOTIFY_INFO.clientID,
    redirect_uri: encodeURIComponent(protocol + "//" + host + "/spotifyCallback"),
    scope: encodeURIComponent(SPOTIFY_INFO.scopes),
    response_type: "code",
    show_dialog: true,
    state: stateParam
  };

  for(const key in options){
    url += `&${key}=${options[key]}`;
  }

  return url;
}
