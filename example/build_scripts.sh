#!/bin/bash
##################################################
#  Build client module and copy index + scripts  #
##################################################

cd ../client
gulp scripts
cp -r src/main/webapp/* ../example/src/main/webapp/
