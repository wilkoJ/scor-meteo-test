import React from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import utils from "../utils/utils";

const apiKey = "b845c65b5443400bb2595d7695a87593"; //devrait etre dans une variable d'env ou un fichier conf !

const CitySearch = (props) => {
  const [city, setCity] = React.useState("");
  const [error, setError] = React.useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
    header: {
      textAlign: "center",
      margin: "auto",
      maxWidth: 400,
      color: "#2196f3",
    },
    buttonSearch: {
      backgroundColor: "#2196f3",
      color: "white",
      height: "55px",
      marginLeft: "2rem",
    },
  }))();

  // avec une api on aurait pu avoir une autocomplétion.
  // au lieu d'avoir un handleSubmit au clique on aurait pu intégrer un debounce!
  const handleSubmit = async (event) => {
    event.preventDefault();
    utils.checkLocalStorage();
    // localStorage.clear();
    if (!localStorage.getItem(city)) {
      try {
        const resp = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=10&units=metric&appid=${apiKey}`
        );
        props.onSubmit(resp.data);
        props.changeState("results");
        localStorage.setItem(city, JSON.stringify(resp.data));
        localStorage.setItem(city + "Date", new Date(Date.now()));
      } catch (error) {
        setError(true);
      }
    } else {
      props.onSubmit(JSON.parse(localStorage.getItem(city)));
      props.changeState("results");
    }
  };
  return (
    <div className={useStyles.root}>
      <Typography variant="h3" align="center" className={useStyles.header}>
        {props.trads.searchTitle}
      </Typography>
      <Paper className={useStyles.paper}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label={props.trads.city}
            variant="outlined"
            error={error}
            helperText={error ? props.trads.noCity : ""}
            type="text"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setError(false);
            }}
            placeholder="City"
            required
          />
          <Button
            variant="contained"
            type="submit"
            className={useStyles.buttonSearch}
            disableElevation
          >
            {props.trads.search}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default CitySearch;
