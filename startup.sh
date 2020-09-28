#!/bin/bash 

docker build -t tacs-utn/simple-api-example .
echo 'Running API...'
docker run -d -p 9999:8080 --name api2 tacs-utn/simple-api-example
