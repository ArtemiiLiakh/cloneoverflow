# ============ BUILD ============
FROM node:20-alpine3.20 as build

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./common/package.json /app/common/package.json
COPY ./frontend/package.json /app/frontend/package.json

WORKDIR /app
RUN npm ci --workspaces=common --ignore-scripts && \
    npm ci --workspaces=frontend --ignore-scripts

WORKDIR /app/common
COPY ./common /app/common
RUN npm run build

WORKDIR /app/frontend
ENV VITE_API_URL=http://localhost:8000
COPY ./frontend /app/frontend
RUN npm run build

# ============ PRODUCTION ============
FROM nginx:1.19.0 as production

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]