FROM node:latest
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN npm i && npm run build
CMD ["npm", "start"]
