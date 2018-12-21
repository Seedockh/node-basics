import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import Snackbar from '../components/Snackbar';
import './EditUser.css';

export default class EditUser extends Component {
  state = {
    updatepassword: this.props.updatepassword,
    nickname: localStorage.username,
    email: localStorage.usermail,
    old_password: "",
    password: "",
    password_confirmation: "",
    msg: "",
    variant: "error",
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
    const { uuid, token } = localStorage;

    const response = await fetch("http://localhost:4242/api/users/update/"+uuid, {
      headers: {
        "Authorization": 'Bearer '+token,
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({nickname, email, token}),
    });

    const json = await response.json();
    if (json.error) {
      return this.setState({
        open_snack: true, variant:"error", msg: json.error,
        nickname: localStorage.username, email: localStorage.usermail
      });
    } else {
      localStorage.username = nickname; localStorage.usermail = email;
      this.props.userupdate();
      return this.setState({ open_snack: true, variant:"success", msg: "Details updated successfully."});
    }
  }

  updatepassword = async () => {
    const { old_password, password, password_confirmation } = this.state;
    const { uuid, token } = localStorage;

    if (password!=="") {
      if (password_confirmation!==password) {
        return this.setState({ open_snack: true, msg: "Password confirmation different than password."});
      } else {
          const response = await fetch("http://localhost:4242/api/users/updatepassword/"+uuid, {
            headers: {
              "Authorization": 'Bearer '+token,
              "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({old_password, password, password_confirmation, token}),
          });

          const json = await response.json();

          if(json.error) {
            return this.setState({ open_snack: true, variant:"error", msg: json.error});
          } else {
            localStorage.clear();
            this.setState({ open_snack: true, variant:"success", msg: "Password updated successfully."});
            this.props.changePassword();
          }
      }
    }
  }

  render() {
    const { updatepassword, nickname, email, old_password, password,
            password_confirmation, msg, open_snack, variant } = this.state;

    return (
      <>
        {!updatepassword && (
          <div className="editform">
            <TextField
              margin="dense"
              id="nickname"
              label="Nickname"
              name="nickname"
              value={nickname||''}
              type="text"
              fullWidth
              variant="outlined"
              onChange={this.handleChange}
              spellCheck="false"
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              value={email||''}
              type="email"
              margin="dense"
              variant="outlined"
              fullWidth
              onChange={this.handleChange}
              spellCheck="false"
            />

            {(msg.length>0) && (
              <Snackbar variant={variant} message={msg} open={open_snack} onClose={this.handleCloseSnack}/>
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
              required
              id="old_password"
              label="Old Password"
              name="old_password"
              type="password"
              value={old_password}
              margin="dense"
              variant="outlined"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              required
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
              required
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
              <Snackbar variant={variant} message={msg} open={open_snack} onClose={this.handleCloseSnack}/>
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
