import PropTypes from "prop-types";
import { useState, useEffect } from "react";
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
  const [timeRange, setTimeRange] = useState("short_term");
  const [trackSlideIndex, setTrackSlideIndex] = useState(0);
  const [artistSlideIndex, setArtistSlideIndex] = useState(0);

  useEffect(() => {
    fetchTopTracksAndArtists(timeRange);
  }, [spotify, timeRange]);

  const fetchTopTracksAndArtists = (range) => {
    spotify
      .getMyTopTracks({ limit: 20, time_range: range })
      .then((tracks) => {
        console.log("Top Tracks:", tracks);
        setTopTracks(tracks.items);
      })
      .catch((err) => {
        console.error(err);
      });

    spotify
      .getMyTopArtists({ limit: 20, time_range: range })
      .then((artists) => {
        console.log("Top Artists:", artists);
        setTopArtists(artists.items);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const tracksPerPage = 4;
  const trackSlides = [];
  for (let i = 0; i < topTracks.length; i += tracksPerPage) {
    trackSlides.push(topTracks.slice(i, i + tracksPerPage));
  }

  const artistsPerPage = 4;
  const artistSlides = [];
  for (let i = 0; i < topArtists.length; i += artistsPerPage) {
    artistSlides.push(topArtists.slice(i, i + artistsPerPage));
  }

  return (
    <div className="Music">
      <div className="user">
        <p className="user-name">Logged In As {user.display_name}</p>
        <img className="user-img" src={user.images[0].url} alt="User" />
      </div>
      <div className="top-music">
        <div className="top-tracks">
          <h1>Top Tracks</h1>
          <div className="time-range-buttons">
            <button
              className={timeRange === "short_term" ? "active" : ""}
              onClick={() => setTimeRange("short_term")}
            >
              4 Weeks
            </button>
            <button
              className={timeRange === "medium_term" ? "active" : ""}
              onClick={() => setTimeRange("medium_term")}
            >
              6 Months
            </button>
            <button
              className={timeRange === "long_term" ? "active" : ""}
              onClick={() => setTimeRange("long_term")}
            >
              All Time
            </button>
          </div>
          <ul>
            {trackSlides[trackSlideIndex] &&
              trackSlides[trackSlideIndex].map((track, index) => (
                <li key={index}>
                  <p className="index">{index + 1}</p>
                  <img
                    className="track-img"
                    src={track.album.images[0].url}
                    alt={track.name}
                  />
                  <p className="track-name">
                    {track.name}
                    <br />
                    <span className="track-artist">
                      {track.artists[0].name}
                    </span>
                  </p>
                </li>
              ))}
          </ul>
          <div className="carousel-navigation">
            {trackSlides.map((_, index) => (
              <button
                key={index}
                className={trackSlideIndex === index ? "active" : ""}
                onClick={() => setTrackSlideIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="top-artists">
          <h1>Top Artists</h1>
          <div className="time-range-buttons">
            <button
              className={timeRange === "short_term" ? "active" : ""}
              onClick={() => setTimeRange("short_term")}
            >
              4 Weeks
            </button>
            <button
              className={timeRange === "medium_term" ? "active" : ""}
              onClick={() => setTimeRange("medium_term")}
            >
              6 Months
            </button>
            <button
              className={timeRange === "long_term" ? "active" : ""}
              onClick={() => setTimeRange("long_term")}
            >
              All Time
            </button>
          </div>
          <ul>
            {artistSlides[artistSlideIndex] &&
              artistSlides[artistSlideIndex].map((artist, index) => (
                <li key={index}>
                  <p className="index">{index + 1}</p>
                  <img
                    className="artist-img"
                    src={artist.images[0].url}
                    alt={artist.name}
                  />
                  <p className="artist-name">
                    {artist.name}
                    <br />
                  </p>
                </li>
              ))}
          </ul>
          <div className="carousel-navigation">
            {artistSlides.map((_, index) => (
              <button
                key={index}
                className={artistSlideIndex === index ? "active" : ""}
                onClick={() => setArtistSlideIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
