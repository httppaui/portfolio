# ─── Build stage ────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ─── Serve stage ────────────────────────
FROM nginx:stable-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config for SPA routing
RUN echo 'server { \
  listen 80; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { try_files $uri $uri/ /index.html; } \
  gzip on; \
  gzip_types text/css application/javascript image/svg+xml; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
