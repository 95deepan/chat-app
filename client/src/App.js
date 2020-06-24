import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TopBar from "./components/TopBar";
import ChatFavourites from "./components/ChatFavourites";
import ChatWindow from "./components/ChatWindow";
import UserLogin from "./components/User.login";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  chatFav: {
    height: "100vh",
    width: "100%",
    backgroundColor: "skyblue",
  },
  chatWindow: {
    height: "100vh",
    width: "100%",
    backgroundColor: "pink",
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRoom: null,
      loggedInuser: null,
      allUsers: [],
    };
  }

  selectRoom = (roomObj) => {
    this.setState({ selectedRoom: roomObj });
  };

  userLogin = (user) => {
    this.setState({ loggedInuser: user });
  };

  render() {
    const { classes } = this.props;
    const { selectedRoom, loggedInuser } = this.state;

    return (
      <Grid container className={classes.root} spacing={2}>
        <TopBar
          logout={() => this.setState({ loggedInuser: null })}
          currentUser={loggedInuser}
          selectedRoom={selectedRoom}
        />
        {loggedInuser ? (
          <Grid item xs={12}>
            <Grid container justify="center" spacing={0}>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <div style={{ height: 60 }} />
                <ChatFavourites
                  loggedInuser={loggedInuser}
                  selectedRoom={selectedRoom}
                  selectRoom={this.selectRoom}
                />
              </Grid>
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <ChatWindow
                  loggedInuser={loggedInuser}
                  selectedRoom={selectedRoom}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <UserLogin selectUser={this.userLogin} selectedUser={loggedInuser} />
        )}
      </Grid>
    );
  }
}

export default withStyles(useStyles)(App);
