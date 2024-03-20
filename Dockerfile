FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN pnpm install --frozen-lockfile


FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
EXPOSE 3000
CMD [ "pnpm", "serve" ]