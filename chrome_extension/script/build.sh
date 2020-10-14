#! /bin/bash
# You Need Add Permission：chmod +x script/build.sh

build() {
  mkdir -p build/contentScripts
  cp -r src/contentScripts/* build/contentScripts
  echo "Finish..."
}

build