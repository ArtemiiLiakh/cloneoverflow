# ====================== BUILD ====================== 
FROM node:20-alpine3.20 AS build

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

COPY ./common/package.json /app/common/package.json
COPY ./backend/package.json /app/backend/package.json

RUN npm ci --workspace=common --ignore-scripts && \
    npm ci --workspace=backend --ignore-scripts

WORKDIR /app/common
COPY ./common /app/common
RUN npm run build

WORKDIR /app/backend
COPY ./backend/prisma/schema.prisma /app/backend/prisma/schema.prisma
RUN npm run db:generate:prod

COPY ./backend /app/backend
RUN npm run build

# ====================== Install prod packages ======================
FROM node:20-alpine3.20 AS package
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

COPY ./common/package.json /app/common/package.json
COPY ./backend/package.json /app/backend/package.json

RUN npm ci --workspace=common --omit=dev --ignore-scripts && \
    npm ci --workspace=backend --omit=dev --ignore-scripts

WORKDIR /app/backend
COPY ./backend/prisma/schema.prisma /app/backend/prisma/schema.prisma
RUN npm run db:generate:prod

# ====================== RUN ====================== 
FROM node:20-alpine3.20 AS production

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

COPY ./common/package.json /app/common/package.json
COPY ./backend/package.json /app/backend/package.json

COPY --from=package /app/node_modules /app/node_modules
COPY --from=build /app/common/dist /app/common/dist
COPY --from=build /app/backend/dist /app/backend/dist

WORKDIR /app/backend
COPY ./backend/prisma/schema.prisma /app/backend/prisma/schema.prisma

EXPOSE 8000

CMD ["sh", "-c", "npm run start:prod"]
