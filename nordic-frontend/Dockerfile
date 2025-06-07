# Use minimal Node image 
FROM node:18-alpine AS base 
WORKDIR /app 

# Install pnpm 
RUN npm install -g pnpm 

# Install deps and build 
FROM base AS builder 
COPY . . 
RUN pnpm install 
RUN pnpm build 

# Final image 
FROM node:18-alpine AS runner 

WORKDIR /app 

# Copy standalone build output 
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/public ./public 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000 
CMD ["node", "server.js"]