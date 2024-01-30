import { useUser } from "../Providers/UsersProvider";
import { AccountForm } from "./Account Components/AccountForm";

export const CreateUser = () => {
  const { verifyNewUser } = useUser();

  return <AccountForm label="New User" buttonLabel="Create Account" formAction={verifyNewUser} />;
};
