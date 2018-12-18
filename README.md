# LAUNCHER

First, those lines will check if ports needed for project (3000/4242) are already in use.
You can chose to completely skip this part by commenting it entirely (by default).

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
  ...
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
