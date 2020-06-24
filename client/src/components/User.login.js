import React, { Component } from "react";
import { Grid, Menu, MenuItem, Typography } from "@material-ui/core";
import { getUsers } from "../api";

const ITEM_HEIGHT = 48;

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      anchorEl: null,
    };
  }
  componentDidMount = () => {
    getUsers()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ allUsers: res.data ? res.data.data : [] });
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { selectUser, selectedUser } = this.props;
    const { allUsers, anchorEl } = this.state;

    return (
      <div
        style={{
          display: "flex",
          height: "70vh",
          width: "100%",
          alignContent: "center",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   alignSelf: "center",
        }}
      >
        <Typography
          style={{
            marginTop: "28vh",
            marginLeft: "42.5%",
          }}
        >
          Login as
        </Typography>
        {allUsers.length && (
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={true}
            onClose={this.handleClose}
            PaperProps={{
              style: {
                display: "flex",
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
                alignSelf: "center",
                marginLeft: "40%",
                justifySelf: "center",
              },
            }}
          >
            {allUsers.map((user) => (
              <MenuItem
                key={user._id}
                selected={false}
                onClick={() => {
                  this.props.selectUser(user);
                  this.handleClose();
                }}
              >
                {user.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
    );
  }
}

export default UserLogin;
