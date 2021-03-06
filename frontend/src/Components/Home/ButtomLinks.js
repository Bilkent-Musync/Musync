import React from "react";
import {Link as RouterLink} from "react-router-dom";

import Grid from "@material-ui/core/Grid/index";
import Link from "@material-ui/core/Link/index";
import Typography from "@material-ui/core/Typography/index";
import withAuth from "../../auth/withAuth";


const ButtomLinks = (props) => {
  const to = (pathname, user) => {
    if(user)
      pathname = pathname + "/" + user._id;
    
    return {
      pathname: pathname,
      state: { from: window.location.pathname }
    }
  };
  
  const loginLink = <Link component={RouterLink}
                          color="secondary"
                          to={to("/login")}
                          children="Login" />;
  const logoutLink = <Link component={RouterLink}
                           color="secondary"
                           to={to("/logout")}
                           onClick={props.logout}
                           children="Logout" />;
  const createAccLink = <Link component={RouterLink}
                              color="secondary"
                              to={to("/register")}
                              children="Create an account"/>;
  const profileLink = <Link component={RouterLink}
                            color="secondary"
                            to={to("/user", props.authUser)}
                            children="Profile"/>;
  const allPlacesLink = <Link component={RouterLink}
                              color="secondary"
                              to={to("/allplaces")}
                              children="See all places in Musync"/>;
  
  return (
    <Grid item xs={12}>
      <Typography gutterBottom align="center" color="secondary">
        {props.isAuthenticated ? profileLink : createAccLink}
      </Typography>
      
      <Typography gutterBottom align="center">
        {props.isAuthenticated ? logoutLink : loginLink}
      </Typography>
      
      <Typography gutterBottom align="center">
        {allPlacesLink}
      </Typography>
    
    </Grid>
  );
};

export default withAuth(ButtomLinks);
