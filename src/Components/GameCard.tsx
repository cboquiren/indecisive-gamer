import { TGame } from "../Assets/types";

export const GameCard = ({ game }: { game: TGame }) => {
  return (
    <div className="nes-container is-centered with-title" id="game-card">
      <h1 className="title">{game.name}</h1>
      <div className="box-art-container">
        <img src={game.image} alt={`${game.name} Box Art`} />
      </div>
      <p>X for Hide</p>
      <p>Heart for like</p>
      <p>Trophy for have already played</p>
      <p>Coin for Owned</p>
      <div className="icon-list">
        <i className="nes-icon close is-small"></i>
        <i className="nes-icon heart is-small"></i>
      </div>
    </div>
  );
};
