import { TGame } from "../Assets/types";
import { GameCard } from "./GameCard";

export const PreviewSimilar = ({
  title,
  gameArr,
}: {
  title: string;
  gameArr: TGame[] | undefined;
}) => {
  return (
    <div className="nes-container is-rounded with-title">
      <h1 className="title">{title}</h1>
      {gameArr !== undefined &&
        gameArr.map((game) => {
          return <GameCard game={game} />;
        })}
    </div>
  );
};
