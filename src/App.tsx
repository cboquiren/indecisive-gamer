import { Homepage } from "./Pages/homepage";
import { GamesProvider } from "./Providers/GamesProvider";
import { InteractionsProvider } from "./Providers/InteractionsProvider";
import { UserProvider } from "./Providers/UsersProvider";

function App() {
  return (
    <>
      <GamesProvider>
        <UserProvider>
          <InteractionsProvider>
            <Homepage></Homepage>
          </InteractionsProvider>
        </UserProvider>
      </GamesProvider>
    </>
  );
}

export default App;
