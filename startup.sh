#!/bin/bash 

docker build -t tacs-utn/simple-api-example .
echo 'Running API...'
docker run -d -p 8080:8080 --name api tacs-utn/simple-api-example
