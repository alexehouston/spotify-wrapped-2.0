import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./Music.css";

// eslint-disable-next-line
export default function Music({ user, spotify }) {
  // eslint-disable-next-line
  const [topTracks, setTopTracks] = useState([]);
  // eslint-disable-next-line
  const [topArtists, setTopArtists] = useState([]);
  const [trackTimeRange, setTrackTimeRange] = useState("short_term");
  const [artistTimeRange, setArtistTimeRange] = useState("short_term");
  const [trackSlides, setTrackSlides] = useState([]);
  const [artistSlides, setArtistSlides] = useState([]);
  const [trackSlideIndex, setTrackSlideIndex] = useState(0);
  const [artistSlideIndex, setArtistSlideIndex] = useState(0);

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

  useEffect(() => {
    fetchTopTracksAndArtists(trackTimeRange, artistTimeRange);
    // eslint-disable-next-line
  }, [spotify, trackTimeRange, artistTimeRange]);

  const fetchTopTracksAndArtists = (trackRange, artistRange) => {
    spotify
      .getMyTopTracks({ limit: 20, time_range: trackRange })
      .then((tracks) => {
        setTopTracks(tracks.items);
        const slides = chunkArray(tracks.items, 4);
        setTrackSlides(slides);
      })
      .catch((err) => {
        console.error(err);
      });

    spotify
      .getMyTopArtists({ limit: 20, time_range: artistRange })
      .then((artists) => {
        setTopArtists(artists.items);
        const slides = chunkArray(artists.items, 4);
        setArtistSlides(slides);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    let index = 0;
    while (index < array.length) {
      chunkedArray.push(array.slice(index, index + size));
      index += size;
    }
    return chunkedArray;
  };

  const handleTrackTimeRangeClick = (range) => {
    setTrackTimeRange(range);
    setTimeout(() => {
      setTrackSlideIndex(0);
    }, 120);
  };

  const handleArtistTimeRangeClick = (range) => {
    setArtistTimeRange(range);
    setTimeout(() => {
      setArtistSlideIndex(0);
    }, 120);
  };

  return (
    <div className="Music">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 1.25 }}
      >
        <div className="top-music">
          <div className="top-tracks">
            <h1>Top Tracks</h1>
            <div className="time-range-buttons">
              <button
                className={trackTimeRange === "short_term" ? "active" : ""}
                onClick={() => handleTrackTimeRangeClick("short_term")}
              >
                4 Weeks
              </button>
              <button
                className={trackTimeRange === "medium_term" ? "active" : ""}
                onClick={() => handleTrackTimeRangeClick("medium_term")}
              >
                6 Months
              </button>
              <button
                className={trackTimeRange === "long_term" ? "active" : ""}
                onClick={() => handleTrackTimeRangeClick("long_term")}
              >
                All Time
              </button>
            </div>
            <ul>
              {trackSlides[trackSlideIndex] &&
                trackSlides[trackSlideIndex].map((track, index) => (
                  <li key={index}>
                    <p className="index">{trackSlideIndex * 4 + index + 1}</p>
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
                className={artistTimeRange === "short_term" ? "active" : ""}
                onClick={() => handleArtistTimeRangeClick("short_term")}
              >
                4 Weeks
              </button>
              <button
                className={artistTimeRange === "medium_term" ? "active" : ""}
                onClick={() => handleArtistTimeRangeClick("medium_term")}
              >
                6 Months
              </button>
              <button
                className={artistTimeRange === "long_term" ? "active" : ""}
                onClick={() => handleArtistTimeRangeClick("long_term")}
              >
                All Time
              </button>
            </div>
            <ul>
              {artistSlides[artistSlideIndex] &&
                artistSlides[artistSlideIndex].map((artist, index) => (
                  <li key={index}>
                    <p className="index">{artistSlideIndex * 4 + index + 1}</p>
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
      </motion.div>
    </div>
  );
}
