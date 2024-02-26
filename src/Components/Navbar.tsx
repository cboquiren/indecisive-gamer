import { useNavigate } from "react-router-dom";
import { useSelected } from "../Providers/SelectedProvider";
import { UserBtn } from "./UserBtn";

export const Navbar = () => {
  const { selectRandom } = useSelected();
  const navigate = useNavigate();

  return (
    <nav>
      <UserBtn></UserBtn>
      <h1 onClick={() => navigate("/")} id="title" className="nes-pointer">
        The <span id="indecisive">indecisive</span> Gamer
      </h1>
      <ul className="links-container nes-pointer">
        <li className="user-links" onClick={() => navigate("/suggestion-form")}>
          Find Me A Game
        </li>
        <li className="user-links" onClick={() => navigate("/library")}>
          Browse Games
        </li>
        <li
          className="user-links"
          onClick={() => {
            selectRandom();
            navigate("/game-highlight");
          }}
        >
          Pick A Random Game
        </li>
      </ul>
    </nav>
  );
};
