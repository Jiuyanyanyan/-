#!/bin/bash

echo "Installing more dependencies..."

cd node_modules

DEPS=(
  "styled-jsx@5.1.1"
  "react-is@18.2.0"
  "swc-core@1.7.1"
  "swc-registry@1.0.1"
  "@swc/helpers@0.5.1"
)

for dep in "${DEPS[@]}"; do
  name=$(echo "$dep" | cut -d'@' -f1)
  version=$(echo "$dep" | cut -d'@' -f2)
  
  echo "Installing $dep..."
  
  mkdir -p "$name"
  cd "$name"
  curl -sLO "https://registry.npmjs.org/$name/-/$name-$version.tgz"
  tar -xzf "$name-$version.tgz"
  rm "$name-$version.tgz"
  
  if [ -d "package" ]; then
    mv package/* .
    rmdir package
  fi
  
  cd ..
  
  echo "Installed $name"
done

cd ..

echo "Installing more dependencies complete!"
