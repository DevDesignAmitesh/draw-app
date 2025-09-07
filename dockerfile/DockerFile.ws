FROM node:20-alpine

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./apps/ws-backend/package.json /apps/ws-backend/
COPY packages packages

RUN npm install -g pnpm

# Install Postgres client to use pg_isready
RUN apk add --no-cache postgresql-client

RUN pnpm install --filter "{packages/*}"

RUN pnpm generate

RUN pnpm --filter="./packages/*" build

COPY . .

RUN pnpm install --filter ws-backend

RUN pnpm build:ws-backend

EXPOSE 9000

# Copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Use entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "pnpm", "start:ws-backend" ]
