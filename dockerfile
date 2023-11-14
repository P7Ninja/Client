FROM node:18 as build

WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD [ "nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;" ]