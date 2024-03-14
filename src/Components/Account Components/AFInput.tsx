import { ComponentProps } from "react";
import { Transform } from "../../Assets/transformations";

export const AFInputContainer = ({
  label,
  inputProps,
}: {
  label: string;
  inputProps: ComponentProps<"input">;
}) => {
  return (
    <div className={`${label}-container`}>
      <label htmlFor={label}>{`${Transform.capitalize(label)}: `}</label>
      <input type="text" className="nes-input" id={label} {...inputProps} />
    </div>
  );
};
