import React from "react";

import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import history from "../../utils/history";
import logo from "../../assets/logo.png";


export const Heading = () => {
  return (
    <Grid item xs={10} onClick={() => history.push('/')} style={{cursor: "pointer"}}>
      <img src={logo} alt="Musync logo" height={48}/>
      <Typography variant="h2" align="center" color="primary" inline>
        Musync
      </Typography>
      
      <Typography align="center" color="secondary">
        Start listening what you want to listen
      </Typography>
    </Grid>
  );
};