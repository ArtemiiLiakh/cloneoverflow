#!/bin/sh

rm -rf ./dist/*

tsc -p tsconfig.types.json &&
tsc -p tsconfig.build-common.json && 
tsc -p tsconfig.build-ejs.json && 

tsc-alias -p tsconfig.types.json &&
tsc-alias -p tsconfig.build-common.json && 
tsc-alias -p tsconfig.build-ejs.json