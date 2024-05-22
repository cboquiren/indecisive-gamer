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
          <img loading="lazy" src={game?.image} alt={`${game?.name} Box Art`} />
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
          labelArr={["Click To Show As Owned", "Click To Show As Unowned"]}
        />
        <InteractionBtn
          label="play"
          interaction="played"
          direction="right"
          game={game}
          gameArr={playedG}
          className={"trophy"}
          labelArr={["Click To Show As Played", "Click To Show As Never Played"]}
        />
        <InteractionBtn
          label="like"
          interaction="favorite"
          direction="right"
          game={game}
          gameArr={favG}
          className={["heart is-empty", "heart is-transparent", "heart"]}
          labelArr={["Click To Show as Liked", "Click To Show As Not Liked"]}
        />
      </div>
    </div>
  );
};
