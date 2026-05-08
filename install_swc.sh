#!/bin/bash

echo "Installing @swc/helpers..."

mkdir -p node_modules/@swc

cd node_modules/@swc

curl -sLO "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.1.tgz"

mkdir -p helpers
cd helpers
tar -xzf "../helpers-0.5.1.tgz"
rm "../helpers-0.5.1.tgz"

if [ -d "package" ]; then
  mv package/* .
  rmdir package
fi

cd ../..

echo "Installed @swc/helpers!"
