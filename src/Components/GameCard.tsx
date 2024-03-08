import { useNavigate } from "react-router";
import { TGame } from "../Assets/types";
import { useSelected } from "../Providers/SelectedProvider";
import { InteractionBtn } from "./Buttons/InteractionBtn";

export const GameCard = ({ game }: { game: TGame }) => {
  const { setSelectedGame } = useSelected();
  const { userGameArrs } = useSelected();
  const { favG, ownedG, playedG, hiddenG } = userGameArrs;
  const navigate = useNavigate();

  return (
    <div id="game-card">
      <div
        className="nes-container is-centered is-rounded with-title nes-pointer"
        onClick={() => {
          setSelectedGame(game ? game : null);
          navigate("/game-highlight");
        }}
      >
        <h1 className="title card-title">{game?.name}</h1>
        <div className="box-art-container">
          <img src={game?.image} alt={`${game?.name} Box Art`} />
        </div>
      </div>
      <div className="nes-container" id="interaction-container">
        <InteractionBtn
          label="hide"
          interaction="hidden"
          direction="left"
          game={game}
          gameArr={hiddenG}
          className={"close"}
          labelArr={["Hide This Game", "Show this Game"]}
        />
        <InteractionBtn
          label="own"
          interaction="owned"
          direction="left"
          game={game}
          gameArr={ownedG}
          className={"coin"}
          labelArr={["I Own This Game", "I Don't Own This Game"]}
        />
        <InteractionBtn
          label="play"
          interaction="played"
          direction="right"
          game={game}
          gameArr={playedG}
          className={"trophy"}
          labelArr={["I've Played This Game", "I Have Not Played This Game"]}
        />
        <InteractionBtn
          label="like"
          interaction="favorite"
          direction="right"
          game={game}
          gameArr={favG}
          className={["heart is-empty", "heart is-transparent", "heart"]}
          labelArr={["Like This Game", "Unlike This Game"]}
        />
      </div>
    </div>
  );
};
