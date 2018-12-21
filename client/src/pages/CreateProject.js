import React, { Component } from "react";
import { TextField, Button, Dialog,
         DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import "./SignIn.css";
import Snackbar from "../components/Snackbar";

export default class CreateProject extends Component {
  state = {
    name: '',
    msg: '',
    open_snack: true,
  };

  handleClose = () => {
    this.props.close();
  };

  handleCloseSnack = async () => {
    await this.setState({open_snack: false, name:'' });
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  enterPress = (ev) => {
    if (ev.key === 'Enter') {
      this.create();
      ev.preventDefault();
    }
  };

  create = async () => {
    const { name } = this.state;
    const { uuid, token } = localStorage;
    if (name==='') return this.setState({ open_snack:true, msg: "A name is required."})
    const response = await fetch("http://localhost:4242/api/projects/create", {
      headers: {
        "Authorization": 'Bearer '+token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ name, uuid: uuid })
    });

    const json = await response.json();

    if (json.err) {
      return this.setState({ open_snack: true, msg: json.err });
    } else {
      this.props.getProjects();
      this.handleClose();
    }
  };

  render() {
    const { name, msg, open_snack } = this.state;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
          <DialogTitle id="form-dialog-title">Create a project</DialogTitle>
          <DialogContent>
            <TextField
              disabled
              margin="dense"
              id="username"
              label="User Name"
              name="username"
              value={localStorage.username}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Project name"
              name="name"
              value={name}
              type="text"
              fullWidth
              onChange={this.handleChange}
              spellCheck="false"
              onKeyPress={this.enterPress}
            />
            {(msg.length>0) && (
              <Snackbar variant="error" message={msg} open={open_snack} onClose={this.handleCloseSnack}/>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.create} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}
