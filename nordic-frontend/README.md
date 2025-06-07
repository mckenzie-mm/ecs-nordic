Environment variables for the Nextjs App

1) For .env.development

HOST=localhost

2) For .env.production.local

HOST=localhost

3) For .env.production

HOST=webapi

--

# During build the dotnet is required to be running 
# on the host machine (localhost:5000) for the generation 
# of the static pages.
# Nextjs build Will use node env production.local first
# with HOST=local

# During running of the container on the docker host 
# Nextjs will use the bridge network
# The env is required to be production
# with HOST=webapi (the network alias of the dotnet container)