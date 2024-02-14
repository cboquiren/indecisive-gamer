import { Homepage } from "./Pages/homepage";
import { GamesProvider } from "./Providers/GamesProvider";
import { InteractionsProvider } from "./Providers/InteractionsProvider";
import { SelectedProvider } from "./Providers/SelectedProvider";
import { UserProvider } from "./Providers/UsersProvider";

function App() {
  return (
    <>
      <GamesProvider>
        <UserProvider>
          <InteractionsProvider>
            <SelectedProvider>
              <Homepage></Homepage>
            </SelectedProvider>
          </InteractionsProvider>
        </UserProvider>
      </GamesProvider>
    </>
  );
}

export default App;
