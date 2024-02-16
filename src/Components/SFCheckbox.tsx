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
    <div>
      <input
        type="checkbox"
        id={filter}
        name={filter}
        value={filter}
        checked={state}
        onChange={() => {
          state ? stateChange(false) : stateChange(true);
        }}
      />
      <label htmlFor={filter}>{label}</label>
    </div>
  );
};
