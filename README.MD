# NODE-BASICS

Local project to learn how to use React with an Express API and using PostGreSQL database.

## Getting Started

The `start.sh` script allows you to install dependencies and to start the server, on both `server` and `client` side.

### Prerequisites

First, have a look at the config section in the `start.sh` file :

```
#########################################
###           SCRIPT CONFIG           ###
#########################################
#   0 = false       #     1 = true      #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
USE_PORTS_CLEANER=1   # Kills current node processes at PORT_TO_USE_WITH_EXPRESS and PORT_TO_USE_WITH_REACT before starting servers
USE_NPM_INSTALL=1     # Runs npm install in EXPRESS_DIRECTORY_NAME and REACT_DIRECTORY_NAME
USE_SERVERS_STARTER=1 # Starts servers in EXPRESS_DIRECTORY_NAME and REACT_DIRECTORY_NAME
UNIX_SYSTEM=1
WINDOWS_SYSTEM=0
PORT_TO_USE_WITH_EXPRESS=4242   # Only required on Windows
PORT_TO_USE_WITH_REACT=3000     #           "
EXPRESS_DIRECTORY_NAME='server'
REACT_DIRECTORY_NAME='client'
COLOR_PRIMARY=2
COLOR_SECONDARY=6
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#~~            END CONFIG             ~~#
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
```

### Installing

Now that you've chosen your configuration, save the script and open a terminal in our repository.

You can now type the following :

```
./start.sh
```

If you're running on Debian, bash might not be the default shell interpreter. You should run :

```
/bin/bash ./start.sh
```

To end the script and so the application, just press `CTRL+C`.


## Built With

* [Express](https://expressjs.com/en/4x/api.html)
* [React](https://reactjs.org/docs/react-api.html) - app built with `create-react-app`
* [PostGreSQL](https://www.postgresql.org/download/)
* [Material-ui](https://material-ui.com/)




# API

## Models

### Users
```
{
  uuid: { primaryKey: true },
  nickname: { type: STRING, allowNull: false, unique: true },
  email: { type: STRING, allowNull: false, unique: true },
  password: { type: STRING, allowNull: false },
}
```

### Projects
```
{
  id: { primaryKey: true },
  name: { type: STRING, allowNull: false },
}
```

### Associations

What we need to get one `User` of one `Project`:
```
Project.belongsTo(User, {
  onDelete: 'CASCADE'
});
```

What we need to get each `Project` associated to one `User` :
```
User.hasMany(Project);
```

## Routes

All routes can be accessed through `/api/` url.

| Method     | Route        | Description                         | AuthToken |
| -----------|--------------|-------------------------------------|-----------|
| POST | /auth/register | Creates a new user and signed token | No |
| POST | /auth/login | Authenticates a user and creates a new signed token | No |
| POST | /users/:uuid | Gets one user by uuid | Yes |
| PUT | /users/update/:uuid | Updates [nickname,email] of one user | Yes |
| PUT | /users/updatepassword/:uuid | Updates password of one user | Yes |
| DELETE | /users/delete/:uuid | Deletes one user | Yes |
| GET  | /projects/ | Gets all projects with their author | Yes |
| POST | /projects/ | Gets all projects of one user | Yes |
| POST | /projects/search | Searches for projects by names | Yes |
| POST | /projects/create | Creates a new project| Yes |
| PUT | /projects/update/:id | Updates one project | Yes |
| DELETE | /projects/delete/:id | Deletes one project | Yes |



# CLIENT

## Project tree

```
App
 |__ SignUp
 |__ SignIn
 |__ Home
 |     |_______ PublicProjects       
 |
 |__ Dashboard
       |_______ Panels
                  |___ Projects
                          |_____ CreateProject
                          |_____ EditProject
                  |___ EditUser
```

## Renders

### Auth
#### SignUp
![SignUp](/mockups/SignUp.png)

#### SignIn
![SignIn](/mockups/SignIn.png)

### Home
#### getAllProjects
![getAllProjects](/mockups/getAllProjects.png)

#### search
![search](/mockups/Search.png)

### Dashboard
#### getProjects
![getProjects](/mockups/getProjects.png)


### Users
#### update
![update](/mockups/UpdateUser.png)

#### updatePassword
![updatePassword](/mockups/UpdatePasswordUser.png)

#### delete
![delete](/mockups/DeleteUser.png)


### Projects
#### create
![create](/mockups/CreateProject.png)

#### update
![update](/mockups/UpdateProject.png)

#### delete
![delete](/mockups/DeleteProject.png)


## Authors

* **Pierre Hérissé** - *Initial work* - [Seedockh](https://github.com/Seedockh)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
