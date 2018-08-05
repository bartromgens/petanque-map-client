#!/usr/bin/env bash

ng build --prod
rsync -a dist/petanque-map-client/ bartromgens@bartromgens.webfactional.com:/home/bartromgens/webapps/petanquemap_client
