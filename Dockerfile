# Front/Dockerfile
FROM node:20.11.0 AS build
WORKDIR /app
COPY . /app
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist/front/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
