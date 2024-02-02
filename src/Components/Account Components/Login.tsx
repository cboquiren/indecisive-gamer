import { useUser } from "../../Providers/UsersProvider";
import { AccountForm } from "./AccountForm";

export const Login = () => {
  const { userLogin } = useUser();

  return <AccountForm label="Previous User" buttonLabel="Login" formAction={userLogin} />;
};
