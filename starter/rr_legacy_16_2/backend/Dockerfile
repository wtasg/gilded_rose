FROM node:14-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN chmod +x startup.sh
EXPOSE 28001
CMD ["./startup.sh"]

