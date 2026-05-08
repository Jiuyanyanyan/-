@echo off
setlocal

echo Downloading npm...

powershell -Command "Invoke-WebRequest -Uri 'https://registry.npmjs.org/npm/-/npm-10.5.0.tgz' -OutFile 'npm.tgz'"

powershell -Command "Expand-Archive -Path 'npm.tgz' -DestinationPath 'temp_npm'"

mkdir ..\node_modules\npm -Force

xcopy /E /I temp_npm\package ..\node_modules\npm

rmdir /S /Q temp_npm
del npm.tgz

echo npm installed successfully!
