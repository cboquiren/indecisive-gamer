import { Navbar } from "./Components/Navbar";
import { Homepage } from "./Pages/homepage";
import { GamesProvider } from "./Providers/GamesProvider";
import { InteractionsProvider } from "./Providers/InteractionsProvider";
import { SelectedProvider } from "./Providers/SelectedProvider";
import { UserProvider } from "./Providers/UsersProvider";
import { Library } from "./Pages/library";
import { GameHighlight } from "./Pages/gameHighlight";
import { SignIn } from "./Pages/signIn";
import { SuggestionPage } from "./Pages/suggestionPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <UserProvider>
        <GamesProvider>
          <InteractionsProvider>
            <SelectedProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
                <Route path="/library" element={<Library />}></Route>
                <Route path="/game-highlight" element={<GameHighlight />}></Route>
                <Route path="/suggestion-form" element={<SuggestionPage />}></Route>
              </Routes>
            </SelectedProvider>
          </InteractionsProvider>
        </GamesProvider>
      </UserProvider>
    </>
  );
}

export default App;
