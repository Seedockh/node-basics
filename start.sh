#!/bin/sh
trap ctrl_c INT
function ctrl_c() {
  kill -TERM $$
  kill $$
}

printf "%s\n" "$(tput clear)$(tput setaf 2)$(tput bold)" "  ******************************************" "  ***      ~ EXPRESS/REACT LAUNCHER ~    ***" "  ******************************************$(tput sgr 0)"
echo "$(tput setaf 2)$(tput bold)                      exit : CTRL+C or ⌘+C$(tput sgr 0)"

#### ' PORT ALREADY IN USE ' HANDLER ####

## [MACOS/LINUX]
#    fuser -k 4242/tcp
#    fuser -k 3000/tcp

## [WINDOWS]
: <<'END' #This is a block comment
echo "$(tput setaf 2)--- killing processes at port 4242 ... $(tput sgr 0)"
netstat -o -n -a | findstr 0.0:4242
for token in `netstat -a -n -o | findstr 0.0:4242 | awk '{ print $5; }'`
  do
    tskill ${token}
  done
echo "$(tput setaf 3)    ~ If processes:4242 are correctly killed, this will return nothing : ~$(tput sgr 0)"
netstat -o -n -a | findstr 0.0:4242
echo ""
echo "$(tput setaf 2)--- killing processes at port 3000 ... $(tput sgr 0)"
netstat -o -n -a | findstr 0.0:3000
for token in `netstat -a -n -o | findstr 0.0:3000 | awk '{ print $5; }'`
  do
    tskill ${token}
  done
echo "$(tput setaf 3)    ~ If processes:3000 are correctly killed, this will return nothing : ~$(tput sgr 0)"
netstat -o -n -a | findstr 0.0:3000
END
#### ' END HANDLER ' ####

cd ./server
HOSTAPP='Server'
echo ""
echo "$(tput setaf 2)Running $(tput setab 7)$(tput setaf 0)npm install$(tput setaf 2)$(tput setab 0) at "$HOSTAPP"...$(tput sgr 0)"
npm install --loglevel=error
PID=$BASHPID
while [ -e $PID ]
do
  echo -e "$(tput setaf 2).$(tput sgr 0)\c"
  sleep .6
done
printf "%s\n" "$(tput setaf 2)             => $(tput setaf 6)Complete$(tput sgr 0)" ""
cd ../client
HOSTAPP='Client'
echo "$(tput setaf 2)Running $(tput setab 7)$(tput setaf 0)npm install$(tput setaf 2)$(tput setab 0) at "$HOSTAPP"...$(tput sgr 0)"
npm install --loglevel=error
PID=$BASHPID
while [ -e $PID ]
do
    echo -e "$(tput setaf 2).$(tput sgr 0)"
    sleep .6
done
printf "%s\n" "$(tput setaf 2)             => $(tput setaf 6)Complete$(tput sgr 0)"
printf "%s\n" "" "$(tput setaf 6)  ------------------------------------$(tput sgr 0)" "$(tput setaf 6)  |    Launching Server and Client   |$(tput sgr 0)" "$(tput setaf 6)  ------------------------------------$(tput sgr 0)"
cd ../server
npm run dev &
cd ../client
npm start
