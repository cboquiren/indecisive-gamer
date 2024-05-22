import { useNavigate } from "react-router";
import { useInteractions } from "../../Providers/InteractionsProvider";
import { useUser } from "../../Providers/UsersProvider";
import { TGame } from "../../Assets/types";

export const InteractionBtn = ({
  label,
  interaction,
  direction,
  game,
  gameArr,
  className,
  labelArr,
}: {
  label: string;
  interaction: "favorite" | "played" | "owned" | "hidden";
  direction: "left" | "right";
  game: TGame;
  gameArr: TGame[];
  className: string | string[];
  labelArr: string[];
}) => {
  const { user } = useUser();
  const { newInteraction, removeInteraction } = useInteractions();
  const navigate = useNavigate();

  const isClassArr = Array.isArray(className);
  return (
    <div className="icon-list message-list nes-pointer" id={label}>
      {!user && (
        <div
          className={`message -${direction}`}
          id={`${label}-disable`}
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          <div className={`nes-balloon from-${direction}`}>
            <p>Please Login</p>
          </div>
          <i
            className={`nes-icon ${isClassArr ? className[0] : className}`}
          ></i>
        </div>
      )}
      {user && !gameArr.includes(game) && (
        <div className={`message -${direction}`} id={`${label}-false`}>
          <div className={`nes-balloon from-${direction}`}>
            <p>{labelArr[0]}</p>
          </div>
          <i
            className={`nes-icon ${isClassArr ? className[1] : className}`}
            onClick={() => {
              newInteraction({ gameId: Number(game.id), type: interaction });
            }}
          ></i>
        </div>
      )}
      {user && gameArr.includes(game) && (
        <div className={`message -${direction}`} id={`${label}-true`}>
          <div className={`nes-balloon from-${direction}`}>
            <p>{labelArr[1]}</p>
          </div>
          <i
            className={`nes-icon ${isClassArr ? className[2] : className}`}
            onClick={() => {
              removeInteraction({
                gameId: Number(game.id),
                type: interaction,
              });
            }}
          ></i>
        </div>
      )}
    </div>
  );
};
