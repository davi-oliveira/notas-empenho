FROM node:lts-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
EXPOSE 4200
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/notas-empenho /usr/share/nginx/html