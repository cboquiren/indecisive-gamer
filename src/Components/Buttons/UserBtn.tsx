import { useInteractions } from "../../Providers/InteractionsProvider";
import { useUser } from "../../Providers/UsersProvider";
import { useNavigate } from "react-router-dom";

export const UserBtn = () => {
  const { user } = useUser();
  const { userLogout } = useInteractions();

  const navigate = useNavigate();

  return (
    <div id="user-container">
      {user && (
        <div id="user-nav">
          <div className="nes-badge" id="user-name">
            <span className="is-success">{`Welcome Back`}</span>
            <div className="logout-container nes-pointer">
              <div className="nes-badge" id="logout">
                <span
                  className="is-error"
                  onClick={() => {
                    userLogout();
                  }}
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
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
