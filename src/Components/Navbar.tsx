import { useNavigate } from "react-router-dom";
import { useSelected } from "../Providers/SelectedProvider";
import { UserBtn } from "./Buttons/UserBtn";
import { pixelLogos } from "../Assets/data-lists";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [index, setIndex] = useState<number>(0);
  const { selectRandom } = useSelected();
  const navigate = useNavigate();

  const randomizeIndex = () => {
    return Math.floor(Math.random() * pixelLogos.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(randomizeIndex());
    }, 1500);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <nav className="nes-container is-rounded" id="nav">
      <UserBtn></UserBtn>
      <div className="icon-list">
        <i className={pixelLogos[index]}></i>
      </div>
      <h1 onClick={() => navigate("/")} id="title" className="nes-pointer nes-btn is-primary">
        The <span id="indecisive">indecisive</span> Gamer
      </h1>
      <div className="icon-list">
        <i className={pixelLogos[index]}></i>
      </div>
      <ul className="links-container nes-pointer">
        <li className="nes-btn is-success user-links" onClick={() => navigate("/suggestion-form")}>
          I want to play...
        </li>
        <li className="nes-btn is-success user-links" onClick={() => navigate("/library")}>
          Browse Games
        </li>
        <li
          className="nes-btn is-success user-links"
          onClick={() => {
            selectRandom();
            navigate("/game-highlight");
          }}
        >
          Random Game
        </li>
      </ul>
    </nav>
  );
};
