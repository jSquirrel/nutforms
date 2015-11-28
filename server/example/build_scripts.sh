#!/bin/bash
##################################################
#  Build client module and copy index + scripts  #
##################################################

cd ../../client
gulp scripts
cp -r src/main/webapp/* ../server/example/src/main/webapp/
