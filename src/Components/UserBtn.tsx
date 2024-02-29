import { Transform } from "../Assets/transformations";
import { useInteractions } from "../Providers/InteractionsProvider";
import { useUser } from "../Providers/UsersProvider";
import { useNavigate } from "react-router-dom";

export const UserBtn = () => {
  const { user } = useUser();
  const { userLogout } = useInteractions();

  const navigate = useNavigate();

  return (
    <div id="user-container" className="nes-pointer">
      {/* {user && (
        <a className="nes-badge">
          <span className="is-success">{`Welcome ${Transform.capitalize(user.username)}!`}</span>
          <span
            onClick={() => {
              userLogout();
            }}
          >
            Logout
          </span>
        </a>
      )} */}
      {user && (
        <div id="user-nav">
          <a href="#" className="nes-badge" id="user-name">
            <span className="is-success">{`Hello ${Transform.capitalize(user.username)}`}</span>
            <div className="logout-container">
              <a href="#" className="nes-badge" id="logout">
                <span
                  className="is-error"
                  onClick={() => {
                    userLogout();
                  }}
                >
                  Logout
                </span>
              </a>
            </div>
          </a>
        </div>
      )}
      {!user && (
        <button
          className="nes-btn is-warning"
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          Sign Up/Login
        </button>
      )}
    </div>
  );
};
