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
    <div className="d-flex justify-content-center align-items-center mt-5 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 1.25 }}
      >
        <div className="d-flex vw-100 justify-content-center flex-wrap">
          <div className="d-flex flex-column justify-content-center align-items-center px-5 mx-5">
            <h1 className="fs-1 fw-bold pb-3">Top Tracks</h1>
            <div className="time-range-buttons col-12 d-flex justify-content-between py-3">
              <button
                className={trackTimeRange === "short_term" ? "active" : ""}
                onClick={() => handleTrackTimeRangeClick("short_term")}
              >
                <p className="m-0">4 Weeks</p>
              </button>
              <button
                className={trackTimeRange === "medium_term" ? "active" : ""}
                onClick={() => handleTrackTimeRangeClick("medium_term")}
              >
                <p className="m-0">6 Months</p>
              </button>
              <button
                className={trackTimeRange === "long_term" ? "active" : ""}
                onClick={() => handleTrackTimeRangeClick("long_term")}
              >
                <p className="m-0">All Time</p>
              </button>
            </div>
            <ul className="track-list d-flex flex-column justify-content-between align-items-center mt-3">
              {trackSlides[trackSlideIndex] &&
                trackSlides[trackSlideIndex].map((track, index) => (
                  <li className="position-relative py-3 d-flex align-items-center h-25" key={index}>
                    <p className="index fs-2 position-absolute start-0 top-0 rounded-pill fw-bold text-center p-1">
                      {trackSlideIndex * 4 + index + 1}
                    </p>
                    <img
                      className="track-img rounded-pill"
                      src={track.album.images[0].url}
                      alt={track.name}
                    />
                    <p className="track-name d-inline-block fw-bold text-center ps-4 mb-0">
                      {track.name}
                      <br />
                      <span className="track-artist opacity-50 fw-normal">
                        {track.artists[0].name}
                      </span>
                    </p>
                  </li>
                ))}
            </ul>
            <div className="carousel-navigation d-flex justify-content-around w-50 my-3">
              {trackSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTrackSlideIndex(index)}
                  className={trackSlideIndex === index ? "active" : ""}
                >
                  <img src="/assets/dot.png" alt={`Button ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center px-5 mx-5">
            <h1 className="fs-1 fw-bold pb-3">Top Artists</h1>
            <div className="time-range-buttons col-12 d-flex justify-content-between py-3">
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
            <ul className="track-list d-flex flex-column justify-content-between align-items-center mt-3">
              {artistSlides[artistSlideIndex] &&
                artistSlides[artistSlideIndex].map((artist, index) => (
                  <li className="position-relative py-3 d-flex align-items-center h-25" key={index}>
                    <p className="index fs-2 position-absolute start-0 top-0 rounded-pill fw-bold text-center p-1">
                      {artistSlideIndex * 4 + index + 1}
                    </p>
                    <img
                      className="artist-img rounded-pill"
                      src={artist.images[0].url}
                      alt={artist.name}
                    />
                    <p className="artist-name d-inline-block fw-bold text-center ps-4 mb-0">
                      {artist.name}
                      <br />
                    </p>
                  </li>
                ))}
            </ul>
            <div className="carousel-navigation d-flex justify-content-around w-50 my-3">
              {artistSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setArtistSlideIndex(index)}
                  className={artistSlideIndex === index ? "active" : ""}
                >
                  <img src="/assets/dot.png" alt={`Button ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
