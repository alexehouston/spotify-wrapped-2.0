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
        <div className="container-fluid vh-100">
          <div className="pt-3 px-2 d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img className="w-50 rounded-pill" src={user.images[0].url} alt="User" />
              <p className="user-name ms-3 mb-0">{user.display_name}</p>
            </div>
            <p
              className="logout rounded-pill fw-bold text-uppercase py-1 px-2 mb-0"
              onClick={handleLogout}
            >
              Log Out
            </p>
          </div>
          <Music user={user} spotify={spotify} />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
