import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "../Login/Login";
import Music from "../Music/Music";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

export default function App() {
  // eslint-disable-next-line
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
    <>
      {user ? (
        <>
          <p className="logout" onClick={handleLogout}>
            Log Out
          </p>
          <div className="user">
            <img className="user-img" src={user.images[0].url} alt="User" />
            <p className="user-name">Logged In As {user.display_name}</p>
          </div>
          <Music user={user} spotify={spotify} />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
