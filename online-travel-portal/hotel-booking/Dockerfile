FROM node:18-alpine

WORKDIR '/app'
ENV PORT=3000
ENV PORT=3001
ENV PORT=3002
COPY ./package.json ./
RUN npm i
COPY ./ ./
RUN npm run build
CMD ["npm", "run", "start:prod"]