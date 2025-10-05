# syntax=docker/dockerfile:1

# 依存の解決とビルド(builder)
# slimはDebian系
FROM node:22-slim AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
# standalone 出力で本番実行に必要なものだけ束ねる
RUN npm run build

# 実行用（runner）
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# standalone 出力をコピー（.next/standalone + .next/static + public）
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
