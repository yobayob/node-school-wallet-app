FROM node:8.5
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN npm i && npm run build:prod
CMD ["npm", "start"]
