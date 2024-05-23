import { ComponentProps } from "react";
import { Transform } from "../../Assets/transformations";

export const AFInputContainer = ({
  label,
  inputProps,
  type,
}: {
  label: string;
  inputProps: ComponentProps<"input">;
  type: "text" | "password";
}) => {
  return (
    <div className={`${label}-container`}>
      <label htmlFor={label}>{`${Transform.capitalize(label)}: `}</label>
      <input type={type} className="nes-input" id={label} {...inputProps} />
    </div>
  );
};
