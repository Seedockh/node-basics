import React, { Component } from "react";
import { TextField, Button, Dialog,
         DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import "./SignIn.css";

export default class SignIn extends Component {
  state = {
    nickname: '',
    password: '',
    msg: '',
  };

  handleClose = () => {
    this.props.close();
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  login = async () => {
    const response = await fetch("http://localhost:4242/api/auth/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });

    const json = await response.json();
    if (json.error) {
      return this.setState({msg: json.error.message});
    } else {
      // I'M CONNECTED
      console.log(json);
      this.props.connect(json.data.user);
      this.handleClose();
      localStorage.setItem("token", json.meta.token);
      localStorage.setItem("username", json.data.user.nickname);
    }
  };

  render() {
    const { nickname, password, msg } = this.state;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="nickname"
              label="Nickname"
              name="nickname"
              value={nickname}
              type="text"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              name="password"
              value={password}
              type="password"
              fullWidth
              onChange={this.handleChange}
            />
            {(msg.length>0) && (
              <pre className="logmessage">{msg}</pre>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.login} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}
