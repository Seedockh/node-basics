import React, { Component } from "react";
import { TextField, Button, Dialog,
         DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

export default class SignUp extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
    password_confirmation: "",
    msg: "",
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleClose = () => {
    this.props.close();
  };

  register = async () => {
    const response = await fetch("http://localhost:4242/api/auth/register", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });

    const json = await response.json();
    console.log(json);
    if (json.error) {
      return this.setState({msg: json.error});
    } else {
      this.handleClose();
    }
  };

  render() {
    const { nickname, email, password, password_confirmation, msg } = this.state;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
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
              id="email"
              label="Email"
              name="email"
              value={email}
              type="email"
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
            <TextField
              margin="dense"
              id="password_confirmation"
              label="Password confirmation"
              name="password_confirmation"
              value={password_confirmation}
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
            <Button onClick={this.register} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}
