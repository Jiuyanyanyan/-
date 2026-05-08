#!/bin/bash

set -e

echo "Installing all dependencies..."

mkdir -p node_modules

cd node_modules

install_dep() {
  local full_name="$1"
  
  if [[ "$full_name" == @* ]]; then
    local namespace=$(echo "$full_name" | cut -d'/' -f1)
    local pkg_name=$(echo "$full_name" | cut -d'/' -f2 | cut -d'@' -f1)
    local version=$(echo "$full_name" | cut -d'/' -f2 | cut -d'@' -f2)
    local dir_name="$namespace/$pkg_name"
    local url_name="$namespace/$pkg_name"
  else
    local pkg_name=$(echo "$full_name" | cut -d'@' -f1)
    local version=$(echo "$full_name" | cut -d'@' -f2)
    local dir_name="$pkg_name"
    local url_name="$pkg_name"
  fi
  
  echo "Installing $full_name..."
  
  rm -rf "$dir_name"
  mkdir -p "$dir_name"
  cd "$dir_name"
  
  curl -sLO "https://registry.npmjs.org/$url_name/-/$pkg_name-$version.tgz"
  tar -xzf "$pkg_name-$version.tgz"
  rm "$pkg_name-$version.tgz"
  
  if [ -d "package" ]; then
    cp -r package/* .
    rm -rf package
  fi
  
  cd ../..
  
  echo "Installed $full_name"
}

DEPS=(
  "react@18.2.0"
  "react-dom@18.2.0"
  "next@14.2.1"
  "typescript@5.4.5"
  "tailwindcss@3.4.1"
  "postcss@8.4.35"
  "autoprefixer@10.4.18"
  "eslint@8.57.0"
  "eslint-config-next@14.2.1"
  "styled-jsx@5.1.1"
  "react-is@18.2.0"
)

for dep in "${DEPS[@]}"; do
  install_dep "$dep"
done

install_dep "@next/env@14.2.1"
install_dep "@next/swc-win32-x64-msvc@14.2.1"
install_dep "@swc/helpers@0.5.1"

mkdir -p @types
cd @types

TYPE_DEPS=(
  "react@18.2.74"
  "react-dom@18.2.24"
  "node@20.12.7"
)

for dep in "${TYPE_DEPS[@]}"; do
  name=$(echo "$dep" | cut -d'@' -f1)
  version=$(echo "$dep" | cut -d'@' -f2)
  
  echo "Installing @types/$dep..."
  
  rm -rf "$name"
  mkdir -p "$name"
  cd "$name"
  
  curl -sLO "https://registry.npmjs.org/@types/$name/-/$name-$version.tgz"
  tar -xzf "$name-$version.tgz"
  rm "$name-$version.tgz"
  
  if [ -d "package" ]; then
    cp -r package/* .
    rm -rf package
  fi
  
  cd ..
  
  echo "Installed @types/$name"
done

cd ../..

echo "All dependencies installed successfully!"
