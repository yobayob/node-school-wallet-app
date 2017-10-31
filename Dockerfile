FROM node:8.5
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN npm i -g pm2
RUN npm i && npm run build
CMD ["pm2-docker", "start", "ecosystem.config.js", "--env", "production"]
