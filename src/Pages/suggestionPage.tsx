import { SuggestionForm } from "../Components/Suggestion Form/SuggestionForm";

export const SuggestionPage = () => {
  return (
    <div className="container">
      <div className="nes-container is-rounded with-title is-centered blue-bg" id="suggestion">
        <h1 className="title">Suggestion Page</h1>
        <SuggestionForm />
      </div>
    </div>
  );
};
