import { useState } from "react";
import toast from "react-hot-toast";
import { AFInputContainer } from "./AFInput";
import { TUser } from "../../Assets/types";

export const AccountForm = ({
  label,
  buttonLabel,
  formAction,
}: {
  label: string;
  buttonLabel: string;
  formAction: (user: Omit<TUser, "id">) => Promise<TUser>;
}) => {
  const [usernameInput, setUsernameInput] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState<string | null>(null);

  const verified = usernameInput !== null && passwordInput !== null;

  const formReset = () => {
    setPasswordInput(null);
    setUsernameInput(null);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!verified) {
            toast.error("Username and Password must both be valid!");
            setPasswordInput(null);
          } else {
            formAction({ username: usernameInput, password: passwordInput })
              .then(() => formReset())
              .catch(() => setPasswordInput(null));
          }
        }}
      >
        <h2>{label}</h2>
        <AFInputContainer
          label="username"
          inputProps={{
            value: usernameInput === null ? "" : usernameInput,
            onChange: (e) => setUsernameInput(e.target.value),
          }}
        />
        <AFInputContainer
          label="password"
          inputProps={{
            value: passwordInput === null ? "" : passwordInput,
            onChange: (e) => setPasswordInput(e.target.value),
          }}
        />
        <button type="submit">{buttonLabel}</button>
      </form>
    </div>
  );
};
