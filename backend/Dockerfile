# ====================== BUILD ====================== 
FROM node:17-slim as build

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

COPY ./common/package.json /app/common/package.json
RUN npm ci --workspace=common

COPY ./backend/package.json /app/backend/package.json
RUN npm ci --workspace=backend

WORKDIR /app/common
COPY ./common /app/common
RUN npm run build

WORKDIR /app/backend
COPY ./backend /app/backend
RUN npm run test:db:generate && \
    npm run build

# ====================== PACKAGE ======================
FROM node:17-slim as package

WORKDIR /app
COPY ./package.json /app/package.json 
COPY ./package-lock.json /app/package-lock.json

COPY ./common/package.json /app/common/package.json
RUN npm ci --workspace=common --only=production

COPY ./backend/package.json /app/backend/package.json
RUN npm ci --workspace=backend --only=production

# ====================== PRODUCTION ====================== 
FROM node:17-slim as production

COPY ./package.json /app/package.json 
COPY --from=package /app/node_modules /app/node_modules

COPY ./common/package.json /app/common/package.json
COPY ./backend/package.json /app/backend/package.json

COPY --from=build /app/common/dist /app/common/dist
COPY --from=build /app/backend/dist /app/backend/dist
COPY ./backend/prisma/schema.prisma /app/backend/prisma/schema.prisma

WORKDIR /app/backend
CMD ["sh", "-c", "npm run prod:db:sync ; npm run start:prod"]