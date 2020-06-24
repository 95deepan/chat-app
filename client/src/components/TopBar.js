import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  userName: {
    flexGrow: 3,
  },
}));

export default function TopBar(Props, {}) {
  const { selectedRoom, currentUser, logout } = Props;
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Chat App
        </Typography>
        <Typography variant="h6" className={classes.userName} align={"center"}>
          {selectedRoom?.name}
        </Typography>

        {currentUser ? (
          <IconButton onClick={logout} edge={"end"}>
            <ExitToApp color={"secondary"} />
          </IconButton>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
