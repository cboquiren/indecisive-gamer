import { Dispatch, SetStateAction } from "react";

export const CheckboxInput = ({
  filter,
  label,
  state,
  stateChange,
}: {
  filter: string;
  label: string;
  state: boolean;
  stateChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="select-option">
      <label htmlFor={filter}>
        <input
          type="checkbox"
          id={filter}
          className="nes-checkbox"
          name={filter}
          value={filter}
          checked={state}
          onChange={() => {
            state ? stateChange(false) : stateChange(true);
          }}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
