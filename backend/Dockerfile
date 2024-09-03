# ====================== BUILD ====================== 
FROM node:17-slim as build

COPY ./package.json /app/package.json
COPY ./common /app/common

WORKDIR /app/common
RUN npm ci
RUN npm run build

WORKDIR /app/backend

COPY ./backend/package.json /app/backend/package.json
RUN npm ci

COPY ./backend /app/backend
RUN npm run test:db:generate && \
    npm run build

# ====================== PACKAGE ======================
FROM node:17-slim as package

COPY ./package.json /app/package.json 

WORKDIR /app/common
COPY ./common/package.json /app/common/package.json
RUN npm install --omit=dev

WORKDIR /app/backend
COPY ./backend/package.json /app/backend/package.json
RUN npm install --omit=dev

# ====================== PRODUCTION ====================== 
FROM node:17-slim as production

COPY ./package.json /app/package.json 
COPY --from=package /app/node_modules /app/node_modules

COPY ./common/package.json /app/common/package.json
COPY --from=build /app/common/dist /app/common/dist

WORKDIR /app/backend

COPY ./backend/package.json /app/backend/package.json
COPY --from=build /app/backend/dist /app/backend/dist
COPY ./backend/prisma/schema.prisma /app/backend/prisma/schema.prisma

CMD ["sh", "-c", "npm run prod:db:sync ; npm run start:prod"]