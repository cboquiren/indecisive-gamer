import { useNavigate } from "react-router";
import { characters } from "../Assets/data-lists";

export const EmptyResult = () => {
  const navigate = useNavigate();
  return (
    <div className="nes-container is-rounded message-list " id="empty">
      <div className="message-left">
        <div className="nes-balloon from-left">
          <p>We're sorry, your search produced no results. Please try again</p>
        </div>
      </div>
      <div className="icon-list">
        <i className={characters[Math.floor(Math.random() * characters.length)]}></i>
        <div
          className="nes-btn is-success"
          onClick={() => {
            navigate("/suggestion-form");
          }}
        >
          Suggestion Form
        </div>
      </div>
    </div>
  );
};
