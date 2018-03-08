#!/bin/bash

#setting up the repo from where the docker program is being pulled
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

#actual install of docker
sudo apt-get update
sudo apt-get install docker-ce

#making it so that sudo is not required to run docker
sudo groupadd docker
sudo gpasswd -a $USER docker
newgrp docker


#install of docker
sudo curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

#allowing docker-compose to run without sudo
sudo chmod +x /usr/local/bin/docker-compose
