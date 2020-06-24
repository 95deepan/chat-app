import React, { Component } from "react";
import { TextField, Chip } from "@material-ui/core";
import { ChatBubble } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { getMessages, sendMessage } from "../api";

var chatInterval;

const useStyles = (theme) => ({
  virtualSection: {
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
});

function ChatItem(props) {
  const { text, isMyMessage } = props;

  return (
    <div
      style={{ margin: 15, alignSelf: isMyMessage ? "flex-end" : "flex-start" }}
    >
      <Chip label={text} />
      <br />
    </div>
  );
}

class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: [],
    };
  }

  componentWillUnmount = () => {
    if (chatInterval) {
      clearInterval(chatInterval);
    }
  };

  componentDidUpdate = (prevProps) => {
    const { selectedRoom: oldRoom } = prevProps;
    const { selectedRoom: newRoom } = this.props;

    if (oldRoom !== newRoom) {
      if (chatInterval) {
        clearInterval(chatInterval);
      }
      chatInterval = setInterval(() => {
        getMessages(newRoom._id).then((res) => {
          if (res.status === 200) {
            this.setState({ messages: res.data.data });
            // subscribeToMessages(newRoom._id).then((newmessages) => {
            //   if (newmessages.data) {
            //     this.setState({
            //       messages: [...this.state.messages, ...newmessages.data.data],
            //     });
            //   }
            // });
          }
        });
      }, 2000);
    }
  };

  onMessageChange = (evt) => {
    this.setState({ message: evt.target.value });
  };

  onSubmitHandler = (evt) => {
    evt.preventDefault();
    const { messages, message } = this.state;
    const { loggedInuser, selectedRoom } = this.props;
    let localMessages = Object.assign([], messages);
    localMessages.push({
      sender: loggedInuser._id,
      message,
    });
    sendMessage({
      sender: loggedInuser._id,
      message,
      roomId: selectedRoom._id,
    }).then(() => {});
    this.setState({ messages: localMessages, message: "" });
  };

  render() {
    const { selectedRoom, loggedInuser } = this.props;
    const { message, messages } = this.state;
    return (
      <div
        style={{
          height: "100vh",
          borderLeftWidth: 0.3,
          borderLeftStyle: "solid",
          borderLeftColor: "black",
        }}
      >
        {selectedRoom ? (
          <div
            style={{
              display: "flex",
              height: "100vh",
              flexDirection: "column",
            }}
          >
            <div style={{ height: 70 }} />
            {messages.map((msg) => (
              <ChatItem
                isMyMessage={loggedInuser._id === msg.sender}
                text={msg.message}
              />
            ))}

            <form onSubmit={this.onSubmitHandler}>
              <TextField
                placeholder="Type message here..."
                fullWidth
                value={message}
                onChange={this.onMessageChange}
                variant={"outlined"}
                style={{
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </form>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
              alignSelf: "center",
              height: "100vh",
              width: "70vw",
              flexDirection: "column",
              fontSize: "1.5rem",
            }}
          >
            <ChatBubble style={{ fontSize: 50 }} color="primary" />
            Select any people to start chatting.
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(ChatWindow);
