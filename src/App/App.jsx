import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "../Login/Login";
import Music from "../Music/Music"
import "./App.css";

export default function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [user, setUser] = useState("");
  const [spotify, setSpotify] = useState(null);

  useEffect(() => {
    const _spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";

    if (_spotifyToken) {
      setSpotifyToken(_spotifyToken);
      const spotifyInstance = new SpotifyWebApi();
      spotifyInstance.setAccessToken(_spotifyToken);
      spotifyInstance.getMe().then((user) => {
        setUser(user);
        console.log(user);
      });
      setSpotify(spotifyInstance);
    }
  }, []);

  const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

  const handleLogout = () => {
    setSpotifyToken("");
    setUser("");
    setSpotify(null);
  };

  return (
    <div className="App">
      {user ? (
        <>
          <p className="logout" onClick={handleLogout}>Logout</p>
          <Music user={user} spotify={spotify} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
