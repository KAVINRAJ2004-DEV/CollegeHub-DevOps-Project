FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js ./
RUN mkdir -p /data
ENV PORT=3000
ENV DB_PATH=/data/collegehub.db
EXPOSE 3000
CMD ["node","server.js"]
