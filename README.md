# Frontend
Frontend for ECSE 428 Time Machine


# Development Setup 
For the frontend portion, we are using React which used Nodejs.


# NodeJs Installation
Since React is simply a node module, we only to get nodejs and we will be set.

These are the commands for linux os:

```
curl -sL https://deb.nodesource.com/setup | sudo -E bash -
sudo apt-get install -y nodejs
```

For other os:
https://nodejs.org/


# Docker Installation
Docker is used as a method to containerizing our application, which is basically a way to isolate applications we want to run.
Docker compose is a program which allows us to run more than one docker container with a single command.

To install Docker and Docker Compose: 

```
sudo ./docker_install.sh
```

Since there are a few steps to setup the repo to pull from, just run the script written.

Here are the link in case anything acts up:
* Docker: https://docs.docker.com/v17.09/engine/installation/linux/docker-ce/ubuntu/
* Docker Compose: https://docs.docker.com/compose/install/#install-compose


# Running Project
Hopefully all has been installed without too much trouble.
Now with all that setup running the frontend is done in a single command:

```
docker-compose up
```

Docker is being difficult

```
npm install
npm run dev
```

The frontend should now be running at the address shown.
