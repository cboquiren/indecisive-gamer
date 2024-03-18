import { Dispatch, SetStateAction } from "react";

export const GenreSelect = ({
  genre,
  selectGenres,
  setSelectGenres,
}: {
  genre: string;
  selectGenres: string[];
  setSelectGenres: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <div className="select-option">
      <label htmlFor={genre} className="nes-pointer">
        <input
          type="checkbox"
          className="nes-checkbox"
          name={genre}
          id={genre}
          value={genre}
          checked={selectGenres.includes(genre)}
          onChange={() => {
            if (selectGenres.includes(genre)) {
              const index = selectGenres.indexOf(genre);
              setSelectGenres(selectGenres.slice(0, index).concat(selectGenres.slice(index + 1)));
            } else {
              setSelectGenres([...selectGenres, genre]);
            }
          }}
        />
        <span>{genre}</span>
      </label>
    </div>
  );
};
