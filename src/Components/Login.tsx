import { useUser } from "../Providers/UsersProvider";
import { AccountForm } from "./Account Components/AccountForm";

export const Login = () => {
  const { userLogin } = useUser();

  return <AccountForm label="Previous User" buttonLabel="Login" formAction={userLogin} />;
};
