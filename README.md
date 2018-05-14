# docker-simple-example
A simple dockerized nodejs api

This example include a node js webserver script to the docker image based on node:latest.

It will start the server listening on port 8080.

# Build and Running

$ docker build -t tacs-utn/simple-api-example .

$ docker run -d -p 8080:8080 --name api tacs-utn/simple-api-example

$ curl localhost:8080 (in another terminal)



