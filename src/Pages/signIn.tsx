import { AccountForm } from "../Components/Account Components/AccountForm";
import { useUser } from "../Providers/UsersProvider";

export const SignIn = () => {
  const { userLogin, createUser } = useUser();
  return (
    <div className="container">
      <div className="nes-container is-rounded with-title is-centered blue-bg" id="sign-in">
        <h1 className="title">Account Page</h1>
        <AccountForm label="New User" buttonLabel="Create Account" formAction={createUser} />
        <AccountForm label="Previous User" buttonLabel="Login" formAction={userLogin} />
      </div>
    </div>
  );
};
