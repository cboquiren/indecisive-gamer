import { useNavigate } from "react-router";
import { CreateUser } from "../Components/Account Components/CreateUser";
import { Login } from "../Components/Account Components/Login";
import { useInteractions } from "../Providers/InteractionsProvider";
import { useSelected } from "../Providers/SelectedProvider";
import { useUser } from "../Providers/UsersProvider";

export const Homepage = () => {
  const { selectedGame, selectRandom } = useSelected();
  const { user } = useUser();
  const { newInteraction, removeInteraction, userLogout } = useInteractions();
  const name = user ? user.username : "guest";
  const game = selectedGame ? selectedGame.name : "Please Login In";
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>This is the Homepage</h1>
      <p>{name}</p>
      <p>{game}</p>
      <button
        onClick={() => {
          navigate("/suggestion-form");
        }}
      >
        Suggestion Form
      </button>
      <br />
      <button
        onClick={() => {
          selectRandom();
        }}
      >
        Random
      </button>
      <CreateUser />
      <Login />
      <br />
      <br />
      <br />
      {user && (
        <div>
          <button
            onClick={() => {
              userLogout();
            }}
          >
            Log Out
          </button>
        </div>
      )}
      {user && (
        <div>
          <p>Add a like</p>
          <button
            onClick={() => {
              newInteraction({ userId: user.id, gameId: 0, type: "favorite" });
            }}
          >
            Like
          </button>
        </div>
      )}
      {user && (
        <div>
          <p>Remove a like</p>
          <button
            onClick={() => {
              removeInteraction({ userId: user.id, gameId: 0, type: "favorite" });
            }}
          >
            Remove Like
          </button>
        </div>
      )}
    </div>
  );
};
