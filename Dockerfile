FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./ 
COPY .env ./
RUN npm ci

COPY ./src ./src
COPY ./public ./public
COPY ./index.html ./index.html
COPY ./vite.config.js ./vite.config.js
COPY ./postcss.config.js ./postcss.config.js
COPY ./tailwind.config.js ./tailwind.config.js

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
