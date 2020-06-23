import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { getUsers } from "./api";
import TopBar from "./components/TopBar";
import ChatFavourites from "./components/ChatFavourites";
import ChatWindow from "./components/ChatWindow";

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
    };
  }

  componentDidMount = () => {
    getUsers()
      .then((res) => {
        if (res.status === 200) {
          // this.setState({ res.data ? res.data.data : []});
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  selectRoom = (roomObj) => {
    this.setState({ selectedRoom: roomObj });
  };

  render() {
    const { classes, currentUser, users } = this.props;
    const { selectedRoom } = this.state;
    return (
      <Grid container className={classes.root} spacing={2}>
        <TopBar
          currentUser={currentUser}
          users={users}
          selectedRoom={selectedRoom}
        />
        <Grid item xs={12}>
          <Grid container justify="center" spacing={0}>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <div style={{ height: 60 }} />
              <ChatFavourites
                selectedRoom={selectedRoom}
                rooms={[
                  { name: "Deepan", lastMessage: "Hello", _id: 1 },
                  { name: "Arun", lastMessage: "How are you?", _id: 2 },
                ]}
                selectRoom={this.selectRoom}
              />
            </Grid>
            <Grid item xs={9} sm={9} md={9} lg={9}>
              <ChatWindow selectedRoom={selectedRoom} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(App);
