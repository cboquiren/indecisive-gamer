import { CreateUser } from "../Components/CreateUser";
import { Login } from "../Components/login";
import { useUser } from "../Providers/UsersProvider";

export const Homepage = () => {
  const { user } = useUser();
  const name = user ? user.username : "guest";
  return (
    <div>
      <h1>This is the Homepage</h1>
      <p>{name}</p>
      <CreateUser />
      <Login />
    </div>
  );
};
