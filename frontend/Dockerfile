# ============ BUILD ============
FROM node:17-slim as build

COPY ./package.json /app/package.json
COPY ./common /app/common

WORKDIR /app/common
RUN npm install
RUN npm run build

WORKDIR /app/frontend
ARG REACT_APP_API_URL=http://localhost:8000
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY ./frontend /app/frontend
RUN npm install && \
    npm run build

# ============ PRODUCTION ============
FROM nginx:1.19.0 as production

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]