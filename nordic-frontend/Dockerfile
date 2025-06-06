# Based on docker blog for dockerizing a React app
# https://www.docker.com/blog/how-to-dockerize-react-app/

FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
# RUN npm run build;
# CMD ["npm", "start"]

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]