import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import Snackbar from './Snackbar';
import './EditUser.css';

export default class SignUp extends Component {
  state = {
    updatepassword: this.props.updatepassword,
    nickname: localStorage.getItem('username'),
    email: localStorage.getItem('usermail'),
    password: "",
    password_confirmation: "",
    msg: "",
    open_snack: true,
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleCloseSnack = async () => {
    await this.setState({open_snack: false, msg:"" });
  }

  updatedetails = async () => {
    const { nickname, email } = this.state;

      //console.log(this.state);
      //console.log(validData); return;
      const response = await fetch("http://localhost:4242/api/users/update/"+localStorage.getItem('uuid'), {
        headers: {
          "Authorization": 'Bearer '+localStorage.getItem('token'),
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({nickname, email}),
      });
      const json = await response.json();

      if (json.error) {
        return this.setState({ open_snack: true, msg: json.error});
      } else {
        return this.setState({ open_snack: true, msg: "Details updated successfully."});
      }

  }

  updatepassword = async () => {
    const { password, password_confirmation } = this.state;

    if (password!=="" && password_confirmation!==password ) {
      return this.setState({ open_snack: true, msg: "Password confirmation different than password."});
    }

    const validData = {};
    Object.keys(this.state)
      .filter(key => this.state[key]!==""
          && typeof(this.state[key])!=="boolean")
      .map( key => {
        if(this.state[key]!==localStorage.getItem('username') && this.state[key]!==localStorage.getItem('usermail')) {
          validData[key] = this.state[key];
        } return key;
      });
      //console.log(this.state);
      //console.log(validData); return;
      const response = await fetch("http://localhost:4242/api/users/update/"+localStorage.getItem('uuid'), {
        headers: {
          "Authorization": 'Bearer '+localStorage.getItem('token'),
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(validData),
      });
      const json = await response.json();

      if (json.error) {
        return this.setState({ open_snack: true, msg: json.error});
      } else {
        console.log("Json without error : ");
        console.log(json.body);
        this.props.register(json.data.user);
        this.handleClose();
      }

  }

  render() {
    const { updatepassword, nickname, email, password, password_confirmation, msg, open_snack } = this.state;

    return (
      <>
        {!updatepassword && (
          <div className="editform">
            <TextField
              margin="dense"
              id="nickname"
              name="nickname"
              value={nickname}
              type="text"
              fullWidth
              variant="outlined"
              onChange={this.handleChange}
            />
            <TextField
              id="email"
              name="email"
              value={email}
              type="email"
              margin="dense"
              variant="outlined"
              fullWidth
              onChange={this.handleChange}
            />

            {(msg.length>0) && (
              <Snackbar variant="error" message={msg} open={open_snack} onClose={this.handleCloseSnack}/>
            )}
            <div className="editbutton">
              <Button className="editbutton" onClick={this.updatedetails} color="secondary">
                Update details
              </Button>
            </div>
          </div>
        )}
        {updatepassword && (
          <div className="editform">
            <TextField
              id="password"
              label="New Password"
              name="password"
              value={password}
              type="password"
              margin="dense"
              variant="outlined"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              id="password_confirmation"
              label="New Password confirmation"
              name="password_confirmation"
              value={password_confirmation}
              type="password"
              margin="dense"
              variant="outlined"
              fullWidth
              onChange={this.handleChange}
            />
            {(msg.length>0) && (
              <Snackbar variant="error" message={msg} open={open_snack} onClose={this.handleCloseSnack}/>
            )}
            <div className="editbutton">
              <Button onClick={this.updatepassword} color="secondary">
                Update password
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}
