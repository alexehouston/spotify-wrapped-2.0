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
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <a
        href={loginUrl}
        id="signIn"
        className="p-3 rounded-pill d-flex align-items-center"
      >
        Sign In With
        <img className="spotify-logo" src="assets/Spotify_Logo_RGB_White.png" />
      </a>
    </div>
  );
}
