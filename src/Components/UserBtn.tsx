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
      {user && (
        <div className="user-nav">
          <h3>{`Welcome ${Transform.capitalize(user.username)}!`}</h3>
          <div
            onClick={() => {
              userLogout();
            }}
          >
            Logout
          </div>
        </div>
      )}
      {!user && (
        <div
          className="user-nav"
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          Sign Up/Login
        </div>
      )}
    </div>
  );
};
