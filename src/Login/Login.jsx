import "./Login.css";

export default function Login() {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const clientId = "7ea98409438c424fb407d905d5cf18f6";
  const redirectUri = "https://spotify-wrapped.netlify.app/";
  const scopes = ["user-top-read"];
  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <div className="Login">
      <a href={loginUrl} id="signIn">
        Sign In With{" "}
        <img
          className="spotify-logo"
          src="../../public/assets/Spotify_Logo_RGB_White.png"
        />
      </a>
    </div>
  );
}
