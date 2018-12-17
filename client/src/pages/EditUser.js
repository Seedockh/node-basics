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

    const response = await fetch("http://localhost:4242/api/users/update/"+localStorage.getItem('uuid'), {
      headers: {
        "Authorization": 'Bearer '+localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({nickname, email}),
    });

    const json = await response.json();
      console.log(json);

    if (json.error) {
      return this.setState({
        open_snack: true, variant:"error", msg: json.error,
        nickname: localStorage.getItem('username'), email: localStorage.getItem('usermail')
      });
    } else {
      localStorage.setItem('username',nickname); localStorage.setItem('usermail',email);
      this.props.userupdate();
      return this.setState({ open_snack: true, variant:"success", msg: "Details updated successfully."});
    }
  }

  updatepassword = async () => {
    const { password, password_confirmation } = this.state;

    if (password!=="") {
      if (password_confirmation!==password) {
        return this.setState({ open_snack: true, msg: "Password confirmation different than password."});
      } else {
          const response = await fetch("http://localhost:4242/api/users/updatepassword/"+localStorage.getItem('uuid'), {
            headers: {
              "Authorization": 'Bearer '+localStorage.getItem('token'),
              "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({password, password_confirmation}),
          });

          const json = await response;
          if (json.error) {
            return this.setState({ open_snack: true, variant:"error", msg: json.error});
          } else {
            return this.setState({ open_snack: true, variant:"success", msg: "Password updated successfully."});
          }
      }
    }



  }

  render() {
    const { updatepassword, nickname, email, password, password_confirmation, msg, open_snack, variant } = this.state;

    return (
      <>
        {!updatepassword && (
          <div className="editform">
            <TextField
              margin="dense"
              id="nickname"
              label="Nickname"
              name="nickname"
              value={nickname}
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
              value={email}
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
