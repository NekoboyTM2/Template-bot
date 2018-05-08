@echo off
title Node.js Modules Installer

echo / ---------------------------------------------- /
echo         Template-bot upated by NekoboyTM2
echo                 5 / 7 / 2018
echo               All rights reserved.
echo / ---------------------------------------------- /
echo       Installing Required Node Modules...
echo / ---------------------------------------------- /
cd %~dp0
cmd /c "npm i"
echo.
echo Done!
echo Creating run files for Selfbot...
echo ------------------------------------
echo @echo off > runbot.bat
echo Created & updated by NekoboyTM2 (https://github.com/NekoboyTM2/template-discord-bot) [ 5 / 7 / 2018 ] >> runbot.bat
echo title Template-bot >> runbot.bat
echo :START >> runbot.bat
echo node bot.js >> runbot.bat
echo pause; >> runbot.bat
echo "runbot.bat" File Created.
echo ------------------------------------
echo Deleting unwanted files...
echo ------------------------------------
del "%~f0"
echo Starting Selfbot...
call runbot.bat
echo Closing...
exit
