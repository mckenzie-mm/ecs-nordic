# Nextjs App

This app is designed to run with a dotnet api
backend.

## Environment variables for Nextjs App

Environment variables for the Nextjs App.

The api endpoint to the dotnet app is defined in the config as:

export const API_ENDPOINT = `http://${HOST}:${PORT}`;

The PORT is 5000 for development and production

1) For development on host machine ".env.development"

    HOST=localhost

2) For building a docker container ".env.production.local"

    HOST=localhost

3) For running of docker container ".env.production"

    HOST=webapi

During the build process, the dotnet app is required to be running 
on the host machine (localhost:5000) for the generation 
of the static pages. Nextjs will use ".env.production.local"
first by default with HOST=localhost.

During running of the container on the docker host, 
Nextjs will use the bridge network.
The env is required to be production (NODE_ENV=production)
with HOST=webapi (the network alias of the dotnet container).

