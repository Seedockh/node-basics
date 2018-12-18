# LAUNCHER

First, those lines will check if ports needed for project (3000/4242) are already used.
You can chose to completely skip this part by commenting it entirely.

If you chose to keep it (to avoid any port conflict e.g.), comment/uncomment the section, depending on your OS :
```bash
#### ' PORT ALREADY IN USE ' HANDLER ####

## [MACOS/LINUX]
#    fuser -k 4242/tcp
#    fuser -k 3000/tcp
## [/MACOS/LINUX]

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
## [/WINDOWS]

#### ' END HANDLER ' ####
```

### Start the project :
To start the whole project, simply type in your root directory :
`$ ./start.sh`

Or double-click on > start.sh file.
