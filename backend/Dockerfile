# ====================== BUILD ====================== 
FROM node:17-alpine as build

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

COPY ./backend/prisma/schema.prisma /app/backend/prisma/schema.prisma
RUN npm run db:generate:prod

COPY ./backend /app/backend
RUN npm run build

# ====================== Install prod packages ====================== 
FROM node:17-alpine as package
WORKDIR /app
COPY ./package.json /app/package.json 
COPY ./package-lock.json /app/package-lock.json

COPY ./common/package.json /app/common/package.json
RUN npm ci --workspace=common --only=production

COPY ./backend/package.json /app/backend/package.json
RUN npm ci --workspace=backend --only=production

# ====================== RUN ====================== 
FROM node:17-alpine as production

USER node

WORKDIR /app

COPY ./package.json /app/package.json 
COPY --from=package --chown=node:node /app/node_modules /app/node_modules

COPY ./common/package.json /app/common/package.json
COPY ./backend/package.json /app/backend/package.json

COPY --from=build --chown=node:node /app/common/dist /app/common/dist
COPY --from=build --chown=node:node /app/backend/dist /app/backend/dist
COPY ./backend/prisma/schema.prisma /app/backend/prisma/schema.prisma

WORKDIR /app/backend
RUN npm run db:generate:prod

EXPOSE 8000

CMD ["sh", "-c", "npm run start:prod"]