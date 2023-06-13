import { motion } from "framer-motion";
import "./Login.css";

export default function Login() {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const clientId = "7ea98409438c424fb407d905d5cf18f6";

  let redirectUri;

  if (window.location.hostname === "localhost") {
    redirectUri = "http://localhost:5173/";
  } else {
    redirectUri = "https://spotify-wrapped.netlify.app/";
  }

  const scopes = ["user-top-read"];
  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <div className="Login">
      <motion.div
        initial={{ opacity: 0, scale: 0.25 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0, 1, 0.2, 1],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 50,
            restDelta: 0.001,
          },
        }}
      >
        <a href={loginUrl} id="signIn">
          Sign In With
          <img
            className="spotify-logo"
            src="assets/Spotify_Logo_RGB_White.png"
          />
        </a>
      </motion.div>
    </div>
  );
}
