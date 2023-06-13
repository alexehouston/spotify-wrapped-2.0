import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { motion } from "framer-motion";
import Login from "../Login/Login";
import Music from "../Music/Music";
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
    <div className="App">
      {user ? (
        <>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            transition={{ duration: 1 }}
          >
            <p className="logout" onClick={handleLogout}>
              Log Out
            </p>
            <div className="user">
              <img className="user-img" src={user.images[0].url} alt="User" />
              <p className="user-name">Logged In As {user.display_name}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 2 }}>
            <Music user={user} spotify={spotify} />
          </motion.div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
