#!/bin/bash

echo "Installing dependencies..."

mkdir -p node_modules

DEPS=(
  "react@18.2.0"
  "react-dom@18.2.0"
  "next@14.2.1"
  "typescript@5.4.5"
  "tailwindcss@3.4.1"
  "postcss@8.4.35"
  "autoprefixer@10.4.18"
  "@types/react@18.2.74"
  "@types/react-dom@18.2.24"
  "@types/node@20.12.7"
  "eslint@8.57.0"
  "eslint-config-next@14.2.1"
)

for dep in "${DEPS[@]}"; do
  name=$(echo "$dep" | cut -d'@' -f1)
  version=$(echo "$dep" | cut -d'@' -f2)
  
  echo "Installing $dep..."
  
  mkdir -p "temp_$name"
  cd "temp_$name"
  
  curl -sLO "https://registry.npmjs.org/$name/-/$name-$version.tgz"
  tar -xzf "$name-$version.tgz"
  rm "$name-$version.tgz"
  
  mkdir -p "../node_modules/$name"
  cp -r package/* "../node_modules/$name/"
  
  cd ..
  rm -rf "temp_$name"
  
  echo "Installed $name"
done

echo "Installation complete!"
