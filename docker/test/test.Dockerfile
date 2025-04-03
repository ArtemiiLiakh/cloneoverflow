# ====================== TEST ====================== 
FROM node:17-slim

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

WORKDIR /app/common
COPY ./common ./
RUN npm ci && npm run build

WORKDIR /app/backend
COPY ./backend/package.json ./package.json
COPY ./backend/prisma ./prisma
RUN npm ci && npm run db:generate

COPY ./backend/tsconfig.json ./tsconfig.json
COPY ./backend/jest.config.json ./jest.config.json
COPY ./backend/src ./src

CMD [ "npm", "run", "test:docker"]