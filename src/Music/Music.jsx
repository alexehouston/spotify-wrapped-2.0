import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import "./Music.css";

export default function Music({ user, spotify }) {
  Music.propTypes = {
    user: PropTypes.shape({
      display_name: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    spotify: PropTypes.object.isRequired,
  };

  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    spotify
      .getMyTopTracks({ limit: 5 })
      .then((tracks) => {
        console.log("Top Tracks:", tracks);
        setTopTracks(tracks.items);
      })
      .catch((err) => {
        console.error(err);
      });

    spotify
      .getMyTopArtists({ limit: 5 })
      .then((artists) => {
        console.log("Top Artists:", artists);
        setTopArtists(artists.items);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [spotify]);

  return (
    <div className="Music">
      <div className="user">
        <p className="user-name">Logged In As {user.display_name}</p>
        <img className="user-img" src={user.images[0].url} alt="User" />
      </div>
      <div className="top-music">
        <div className="top-tracks">
          <h1>Top Tracks</h1>
          <ul>
            {topTracks.map((track, index) => (
              <li key={index}>
                <img
                  className="track-img"
                  src={track.album.images[0].url}
                  alt={track.name}
                />
                <p className="track-name">{track.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="top-artists">
          <h1>Top Artists</h1>
          <ul>
            {topArtists.map((artist, index) => (
              <li key={index}>
                <img
                  className="artist-img"
                  src={artist.images[0].url}
                  alt={artist.name}
                />
                <p className="track-name">{artist.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
