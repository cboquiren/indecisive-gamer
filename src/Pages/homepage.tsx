import { useNavigate } from "react-router";
import { characters } from "../Assets/data-lists";

export const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="container page-container" id="home-container">
      <div className="nes-container is-rounded with-title is-centered" id="homepage">
        <h1 className="title">Homepage</h1>
        <h2 className="nes-text is-error">
          Welcome to{" "}
          <span className="nes-text is-success">
            The <span className="nes-text is-warning">indecisive</span> Gamer
          </span>
        </h2>
        <div className="icon-list icon-banner">
          <i className="nes-logo"></i>
          <i className="nes-mario"></i>
          <i className="nes-jp-logo"></i>
          <i className="nes-ash"></i>
          <i className="snes-logo"></i>
          <i className="nes-kirby"></i>
          <i className="snes-jp-logo"></i>
        </div>
        <p className="nes-text is-disabled">
          Are you exhausted from endlessly scrolling through your gaming library, grappling with the
          overwhelming array of choices and struggling to pick your next adventure? Say goodbye to
          the indecision and embrace boundless gaming opportunities! Here at "The indecisive Gamer"
          we'll make the decisions so that you won't have to.
        </p>
        <div className="message-list">
          <div className="message-left">
            <div className="nes-balloon from-left">
              <p>
                Our platform is designed to make choosing your next gaming adventure a breeze.
                Simply create an account, customize your preferences on our user-friendly form page
                and let us do the rest. Whether you're into action-packed adventures, mind-bending
                puzzles, or fall into an immersive story, we'll handpick the perfect game for you.
              </p>
            </div>
          </div>
          <div className="icon-list">
            <i className={characters[Math.floor(Math.random() * characters.length)]}></i>
            <div className="nav-btns">
              <div
                className="nes-btn is-success"
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                <p>Sign Up/Login</p>
              </div>
              <div
                className="nes-btn is-success"
                onClick={() => {
                  navigate("/suggestion-form");
                }}
              >
                <p>Recommendation Page</p>
              </div>
            </div>
          </div>
        </div>
        <div className="nes-container is-rounded with-title is-centered">
          <h3 className="title">Don't Know Where to Start?</h3>
          <div className="icon-list">
            <i className="nes-icon star"></i>
            <p>
              Not sure where to start? Explore our games, featuring top picks from a diverse range
              of genres, developers, and platforms. With our library page, you can easily keep track
              of your favorite games, ones you've already conquered, and even those you've chosen to
              hide for later.
            </p>
            <i className="nes-icon star"></i>
          </div>
          <div
            className="nes-btn is-success"
            onClick={() => {
              navigate("/library");
            }}
          >
            <p>Game Library</p>
          </div>
        </div>
      </div>
    </div>
  );
};
