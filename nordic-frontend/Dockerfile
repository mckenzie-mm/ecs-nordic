# This docker file of a Nextjs app
# is optimised for a small memory inprint (~300KB)
# following the guidelines of Nextjs documention
# (Without following the guideline, the memory inprint
#  is greater than 4GB).
#
# Use minimal Node image 
FROM node:18-alpine AS base 
WORKDIR /app 

# Install pnpm 
# pnpm results in a smaller package size.
RUN npm install -g pnpm 

# Install deps and build 
FROM base AS builder 
COPY . . 
RUN pnpm install 

# During build the dotnet is required to be running 
# on the host machine (localhost:5000) for the generation 
# of the static pages.
# Nextjs build Will use node env production.local first
# with HOST=local
RUN pnpm build 

# Final image 
FROM node:18-alpine AS runner 

WORKDIR /app 

# Copy standalone build output 
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/public ./public 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# During running of the container on the docker host 
# Nextjs will use the bridge network
# The env is required to be production
# with HOST=webapi (the network alias of the dotnet container)
ENV NODE_ENV=production

EXPOSE 3000 
CMD ["node", "server.js"]