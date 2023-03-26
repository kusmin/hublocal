FROM node:18
WORKDIR /app
COPY ./* ./
RUN npm install
RUN npm run clean
RUN npm run build
EXPOSE 5000
CMD [ "node", "dist/main.js" ]
