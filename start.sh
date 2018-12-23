#!/bin/sh

# On debian :  /bin/bash ./start.sh

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



############################################
###           SCRIPT FUNCTIONS           ###
############################################

function ctrl_c() {
  kill -TERM $$
  kill $$
  kill -TERM $$
}

function freePorts() {
  if [ $UNIX_SYSTEM -eq 1 ]
  then
    lsof -c 'node' | awk 'NR!=1 { if (a[$2]++ == 0) print $2 }' | xargs kill
  fi

  if [ $WINDOWS_SYSTEM -eq 1 ]
  then
    echo "$(tput setaf $COLOR_PRIMARY)  # killing processes at port ${PORT_TO_USE_WITH_EXPRESS} ... $(tput sgr 0)"
    netstat -o -n -a | findstr 0.0:$PORT_TO_USE_WITH_EXPRESS
    for token in `netstat -a -n -o | findstr 0.0:$PORT_TO_USE_WITH_EXPRESS | awk '{ print $5; }'`
      do
        tskill ${token}
      done
    echo "$(tput setaf $COLOR_PRIMARY)  # killing processes at port ${PORT_TO_USE_WITH_REACT} ... $(tput sgr 0)"
    netstat -o -n -a | findstr 0.0:$PORT_TO_USE_WITH_REACT
    for token in `netstat -a -n -o | findstr 0.0:$PORT_TO_USE_WITH_REACT | awk '{ print $5; }'`
      do
        tskill ${token}
      done
  fi
}


function runNpmInstall() {
  cd ./$EXPRESS_DIRECTORY_NAME
  echo "$(tput setaf $COLOR_PRIMARY)  # Running $(tput setab 7)$(tput setaf 0)npm install$(tput setaf $COLOR_PRIMARY)$(tput setab 0) at ./${EXPRESS_DIRECTORY_NAME}/$(tput sgr 0)"
  npm install --loglevel=error
  wait $!
  printf "%s\n" "$(tput setaf $COLOR_PRIMARY)      => $(tput setaf $COLOR_SECONDARY)Complete$(tput sgr 0)" ""
  cd ../$REACT_DIRECTORY_NAME
  echo "$(tput setaf $COLOR_PRIMARY)  # Running $(tput setab 7)$(tput setaf 0)npm install$(tput setaf $COLOR_PRIMARY)$(tput setab 0) at ./${REACT_DIRECTORY_NAME}/$(tput sgr 0)"
  npm install --loglevel=error
  wait $!
  printf "%s\n" "$(tput setaf $COLOR_PRIMARY)      => $(tput setaf $COLOR_SECONDARY)Complete$(tput sgr 0)"
  cd ..
}


function startServers() {
  printf "%s\n" "" "$(tput setaf $COLOR_SECONDARY)  ------------------------------------" "  |    Launching Server and Client   |" "  ------------------------------------$(tput sgr 0)" ""
  if [ $USE_PORTS_CLEANER -eq 1 ]
  then
    printf "%s\n" "$(tput setaf $COLOR_PRIMARY)   $(tput bold)USE_PORTS_CLEANER : $(tput sgr 0)$(tput setaf $COLOR_SECONDARY)enabled" "      $(tput setaf $COLOR_PRIMARY)> This will end all node processes on ports [${PORT_TO_USE_WITH_EXPRESS},${PORT_TO_USE_WITH_REACT}]$(tput sgr 0)"
    read -p "$(tput setaf $COLOR_SECONDARY)      > Press Enter to continue...$(tput sgr 0)"
    echo ""
    freePorts
  else
    printf "%s\n" "$(tput setaf $COLOR_PRIMARY)   $(tput bold)USE_PORTS_CLEANER : $(tput sgr 0)$(tput setaf $COLOR_SECONDARY)disabled" "$(tput sgr 0)"
  fi
  cd ./$EXPRESS_DIRECTORY_NAME
  npm run dev &
  sleep 5
  cd ../$REACT_DIRECTORY_NAME
  npm start
}

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#~~            END FUNCTIONS             ~~#
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#



#########################################
###            SCRIPT LIFE            ###
#########################################
trap ctrl_c INT

printf "%s\n" "$(tput clear)$(tput setaf $COLOR_SECONDARY)$(tput bold)" "  ******************************************" "  ***      ~ EXPRESS/REACT LAUNCHER ~    ***" "  ******************************************" "              Press CTRL+C to exit$(tput sgr 0)" ""

if [ $USE_NPM_INSTALL -eq 1 ]
then
  runNpmInstall
fi

if [ $USE_SERVERS_STARTER -eq 1 ]
then
  startServers
else
  if [ $USE_PORTS_CLEANER -eq 1 ]
  then
    freePorts
  fi
fi

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#~~             END LIFE              ~~#
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
