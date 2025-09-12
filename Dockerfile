FROM node:22-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

COPY . .

RUN npm i -g @angular/cli

ARG APP_ENV
RUN npm run build -- --configuration=${APP_ENV} --progress=false --optimization=true --source-map=false

FROM nginx:alpine

COPY --from=build /app/dist/leilao-ui/browser /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

RUN echo "gzip on;" >> /etc/nginx/conf.d/default.conf && \
    echo "gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;" >> /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]