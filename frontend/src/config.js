export const SERVER_DOMAIN = "http://localhost:1234";
export const SPOTIFY_INFO = {
  clientID: '...',
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
export const SPOTIFY_CALLBACK_URL = SERVER_DOMAIN + "/callback";

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