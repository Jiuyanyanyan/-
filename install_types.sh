#!/bin/bash

echo "Installing type definitions..."

mkdir -p node_modules/@types

cd node_modules/@types

DEPS=(
  "react@18.2.74"
  "react-dom@18.2.24"
  "node@20.12.7"
)

for dep in "${DEPS[@]}"; do
  name=$(echo "$dep" | cut -d'@' -f1)
  version=$(echo "$dep" | cut -d'@' -f2)
  
  echo "Installing @types/$dep..."
  
  curl -sLO "https://registry.npmjs.org/@types/$name/-/$name-$version.tgz"
  
  mkdir -p "$name"
  cd "$name"
  tar -xzf "../$name-$version.tgz"
  rm "../$name-$version.tgz"
  
  echo "Contents in $name:"
  ls -la
  
  cd ..
  
  echo "Installed @types/$name"
done

cd ../..

echo "Installing eslint-config-next..."
mkdir -p "node_modules/eslint-config-next"
cd "node_modules/eslint-config-next"
curl -sLO "https://registry.npmjs.org/eslint-config-next/-/eslint-config-next-14.2.1.tgz"
tar -xzf "eslint-config-next-14.2.1.tgz"
rm "eslint-config-next-14.2.1.tgz"
cd ../..

echo "Type definitions installation complete!"
