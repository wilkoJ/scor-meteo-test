import React from "react";
import utils from "../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Button } from "@material-ui/core";
import "../styles/meteo.css";

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
    color: "#2196f3",
  },
  paperFirst: {
    maxWidth: 500,
    height: "80px",
    alignItems: "center",
    display: "flex",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    color: "#2196f3",
    fontSize: "30px",
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
    display: "block",
    margin: "auto",
  },
}));

const MeteoLine = (props) => {
  const date = new Date(props.dt_txt);
  return (
    <Paper className={props.classe}>
      <Grid container wrap="nowrap" spacing={2}>
        <span className="day">{props.trads["days"][date.getDay()]}</span>{" "}
        <span className="date">
          {utils.formatStringDate(date.getDate()) +
            "/" +
            utils.formatStringDate(date.getMonth())}
        </span>
        <div className={props.weather[0].main.toLowerCase()}></div>
        <span>{Math.round(props.main.temp) + "°"}</span>
      </Grid>
    </Paper>
  );
};

const MeteoDisplay = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" align="center" className={classes.header}>
        {props.trads.city + ": " + props.meteo.city.name}
      </Typography>
      {props.meteo.list.map((item) => (
        <MeteoLine
          key={item.dt}
          {...item}
          classe={
            item.dt == props.meteo.list[0].dt
              ? classes.paperFirst
              : classes.paper
          }
          trads={props.trads}
        />
      ))}
      <Button
        variant="contained"
        type="submit"
        className={classes.buttonSearch}
        disableElevation
        onClick={() => props.changeState("searching")}
      >
        {props.trads.backToSearch}
      </Button>
    </div>
  );
};

export default MeteoDisplay;
