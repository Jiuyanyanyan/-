#!/bin/bash

echo "Fixing type definitions structure..."

cd node_modules/@types

for dir in *; do
  if [ -d "$dir/$dir" ]; then
    echo "Fixing @types/$dir..."
    mv "$dir/$dir"/* "$dir/"
    rmdir "$dir/$dir"
    echo "Fixed @types/$dir"
  fi
done

cd ../..

echo "Fixed type definitions structure!"
