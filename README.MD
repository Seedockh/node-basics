# NODE-BASICS

Local project to learn how to use React with an Express API and using PostGreSQL database.

## Getting Started

The `start.sh` script allows you to install dependencies and to start the server, on bot `server` and `client` side.

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

## Authors

* **Pierre Hérissé** - *Initial work* - [Seedockh](https://gist.github.com/Seedockh)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
