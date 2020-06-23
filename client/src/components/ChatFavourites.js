import React, { Component } from "react";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  withStyles,
} from "@material-ui/core";

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
  render() {
    const { classes, rooms, selectedRoom, selectRoom } = this.props;
    return (
      <List className={classes.list}>
        {rooms.map((room, roomId) => (
          <React.Fragment key={roomId}>
            <ListItem
              onClick={() => selectRoom(room)}
              selected={room._id === selectedRoom?._id}
              button
            >
              <ListItemAvatar>
                <Avatar>{room.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={room.name} secondary={room.lastMessage} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    );
  }
}

export default withStyles()(ChatFavourites);
