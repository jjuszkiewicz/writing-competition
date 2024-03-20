FROM node:18-alpine as builder

WORKDIR /app
COPY ./package* ./
COPY ./tsconfig.json ./
COPY ./src ./src
COPY ./public ./public

RUN npm install && npm run build

FROM node:18-alpine as dev

WORKDIR /app

COPY --from=builder /app/package* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3004

CMD ["npm", "start"]

FROM node:18-alpine as production

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S sii -u 1001

COPY --from=builder /app/package* ./
COPY --from=builder /app/build ./build

RUN ls -la 

RUN npm i --production

USER sii

EXPOSE 3004


CMD ["npm", "start"]