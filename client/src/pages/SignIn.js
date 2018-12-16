import React, { Component } from "react";
import { TextField, Button, Dialog,
         DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import "./SignIn.css";
import Snackbar from "./Snackbar";

export default class SignIn extends Component {
  state = {
    nickname: '',
    password: '',
    msg: '',
    open_snack: true,
    logged: false,
  };

  handleClose = () => {
    this.props.close();
  };

  handleCloseSnack = async () => {
    await this.setState({open_snack: false, nickname: '', password: '' });
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  login = async () => {
    if (this.state.nickname==='' || this.state.password==='') {
      return this.setState({ open_snack:true, msg: "Each field is required."})
    }

    const response = await fetch("http://localhost:4242/api/auth/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });

    const json = await response.json();
    if (json.error) {
      return this.setState({ open_snack: true, msg: json.error.message});
    } else {
      // I'M CONNECTED
      this.props.connect(json.data.user);
      await this.setState({logged: true});
      this.handleClose();
      localStorage.setItem("token", json.meta.token);
      localStorage.setItem("username", json.data.user.nickname);
      localStorage.setItem("uuid",json.data.user.uuid);
    }
  };

  render() {
    const { nickname, password, msg, open_snack } = this.state;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField
              required
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
              required
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
              <Snackbar variant="error" message={msg} open={open_snack} onClose={this.handleCloseSnack}/>
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
