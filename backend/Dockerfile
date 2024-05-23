# ====================== BUILD ====================== 
FROM node:17-slim as build

COPY ./package.json /app/package.json
COPY ./common /app/common

WORKDIR /app/common
RUN npm install
RUN npm run build

COPY ./backend /app/backend

WORKDIR /app/backend
RUN npm install && \
npx prisma generate && \
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

ENV DATABASE_URL=$DATABASE_URL
ENV TOKEN_SECRET=$TOKEN_SECRET

COPY ./backend/package.json /app/backend/package.json
COPY --from=build /app/backend/dist /app/backend/dist
COPY ./backend/prisma/schema.prisma /app/backend/prisma/schema.prisma
RUN npx prisma generate

CMD ["npm", "run", "start:prod"]