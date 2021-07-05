import React from "react";
import CitySearch from "./components/CitySearch";
import MeteoDisplay from "./components/MeteoDisplay";
import trads from "./utils/translate";
import "./App.css";
import { Button } from "@material-ui/core";
// STAR MATCH - V9

const App = () => {
  const [state, setState] = React.useState("searching");
  const [searchResult, setSearchResult] = React.useState({});
  const [language, setLanguage] = React.useState(navigator.language);
  // setLanguage("en-EN");
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        style={{ margin: "12px 12px 0" }}
        onClick={() =>
          language == "fr-FR" ? setLanguage("en-EN") : setLanguage("fr-FR")
        }
      >
        {language == "fr-FR" ? "english" : "Francais"}
      </Button>
      {state == "searching" && (
        <CitySearch
          changeState={setState}
          onSubmit={setSearchResult}
          trads={trads[language]["CitySearch"]}
        />
      )}
      {state == "results" && (
        <MeteoDisplay
          meteo={searchResult}
          changeState={setState}
          trads={trads[language]["MeteoDisplay"]}
        />
      )}
    </>
  );
};

export default App;
