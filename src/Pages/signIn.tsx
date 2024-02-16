import { CreateUser } from "../Components/Account Components/CreateUser";
import { Login } from "../Components/Account Components/Login";

export const SignIn = () => {
  return (
    <div>
      <h1>This is the Sign In Page</h1>
      <p>Where users can sign in or create an account </p>
      <CreateUser />
      <br />
      <br />
      <br />
      <Login />
    </div>
  );
};
