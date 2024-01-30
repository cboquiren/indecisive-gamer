import { Homepage } from "./Pages/homepage";
import { GamesProvider } from "./Providers/GamesProvider";
import { UserProvider } from "./Providers/UsersProvider";

function App() {
  return (
    <>
      <GamesProvider>
        <UserProvider>
          <Homepage></Homepage>
        </UserProvider>
      </GamesProvider>
    </>
  );
}

export default App;
