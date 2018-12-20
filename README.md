### LAUNCHER

First, check the configs to set what you need from the start script :

```bash
#########################################
###           SCRIPT CONFIG           ###
#########################################
#   0 = false       #     1 = true      #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
USE_PORTS_CLEANER=1   # Kills current node processes at PORT_TO_USE_WITH_EXPRESS and PORT_TO_USE_WITH_REACT before starting servers
USE_NPM_INSTALL=1     # Runs npm install in EXPRESS_DIRECTORY_NAME and REACT_DIRECTORY_NAME
USE_SERVERS_STARTER=1 # Starts servers in EXPRESS_DIRECTORY_NAME and REACT_DIRECTORY_NAME
UNIX_SYSTEM=0
WINDOWS_SYSTEM=1
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



### Start the project :
To start the whole project, simply type in your root directory :
`$ ./start.sh`

Or double-click on `start.sh` file.
