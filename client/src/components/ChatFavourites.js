import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  withStyles,
} from "@material-ui/core";
import { getMyRooms } from "../api";

export const useStyles = (theme) => ({
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
  control: {
    padding: theme.spacing(2),
  },
});

class ChatFavourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
    };
  }

  componentDidMount = () => {
    const { loggedInuser } = this.props;
    getMyRooms(loggedInuser._id)
      .then((res) => {
        console.log("rooms are ", res.data);
        if (res.status === 200) {
          this.setState({ rooms: res.data ? res.data.data : [] });
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log("Err is", err);
      });
  };

  selectRoom = (roomObj) => {
    this.setState({ selectedRoom: roomObj });
  };

  render() {
    const { classes, selectedRoom, selectRoom, loggedInuser } = this.props;
    const { rooms } = this.state;

    return (
      <List className={classes.list}>
        {rooms.map((room, roomId) => {
          let HeaderName;

          if (loggedInuser && room) {
            HeaderName =
              room.userOne.name === loggedInuser.name
                ? room.userTwo.name
                : room.userOne.name;
          }

          return (
            <React.Fragment key={roomId}>
              <ListItem
                onClick={() => selectRoom(room)}
                selected={room._id === selectedRoom?._id}
                button
              >
                <ListItemAvatar>
                  <Avatar>{HeaderName ? HeaderName[0] : ""}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={HeaderName} secondary={"Hello"} />
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
    );
  }
}

export default withStyles()(ChatFavourites);
